import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '仪表盘', icon: 'dashboard', affix: true }
      }
    ]
  },

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: false }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/test/Test'),
        name: 'test',
        meta: { title: '测试内容', icon: 'icon', noCache: false }
      }
    ]
  },
  {
    path: '/test2',
    name: 'test2',
    component: Layout,
    meta: { title: '测试内容2', icon: 'icon', noCache: false },
    children: [
      {
        path: 'test2-1',
        hidden: false,
        component: () => import('@/views/test2/Test2-1'),
        name: 'test2-1',
        meta: { title: '测试内容2-1', icon: 'icon', noCache: false }
      },
      {
        path: 'test2-2',
        hidden: false,
        component: () => import('@/views/test2/Test2-2'),
        name: 'test2-2',
        prop: ['name'],
        meta: { title: '测试内容2-2', icon: 'icon', noCache: false }
      },
      {
        path: 'test2-3',
        hidden: false,
        component: () => import('@/views/test2/Test2-3'),
        name: 'test2-3',
        meta: { title: '测试内容2-3', icon: 'icon', noCache: false }
      },
      {
        path: 'test2-4',
        hidden: false,
        component: () => import('@/views/test2/Test2-4'),
        name: 'test2-4',
        meta: { title: '测试内容2-4', icon: 'icon', noCache: false }
      },
      {
        path: 'test2-5',
        hidden: false,
        component: () => import('@/views/test2/Test2-5'),
        name: 'test2-5',
        meta: { title: '测试内容2-5', icon: 'icon', noCache: false }
      },
      {
        path: 'test2-6',
        hidden: false,
        component: () => import('@/views/test2/Test2-6'),
        name: 'test2-6',
        meta: { title: '测试内容2-6', icon: 'icon', noCache: false }
      }

    ]
  },
  {
    path: '/general-view',
    name: 'generalview',
    component: Layout,
    meta: { title: '概览', icon: 'dashboard', noCache: false },
    children: [
      {
        path: 'appzh-view',
        hidden: false,
        component: () => import('@/views/generalView/appzh/index'),
        name: 'appzh-view',
        meta: { title: '软件需求分析', icon: 'skill', noCache: false }
      },
      {
        path: 'apps-view',
        hidden: false,
        component: () => import('@/views/generalView/apps/index'),
        name: 'apps-view',
        meta: { title: '软件维度洞察', icon: 'component', noCache: false }
      },
      {
        path: 'comzh-view',
        hidden: false,
        component: () => import('@/views/generalView/comzh/index'),
        name: 'comzh-view',
        meta: { title: '公司维度洞察', icon: 'chart', noCache: false }
      },

    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/', hidden: true }
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
  mode:'hash'
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
