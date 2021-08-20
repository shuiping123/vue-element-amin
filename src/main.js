import 'babel-polyfill'
import Vue from 'vue'


// import echarts from 'vue-echarts';
import echarts from 'echarts'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters
import _ from 'lodash'
/**
 * 自己写的 - 调用公共js，非admin原生自带
 * */
import currentJs from './assets/js/current.js';//通用函数
import charts_setting from '@/assets/js/charts_setting'//echarts样式配置
Vue.prototype.$current=currentJs;
Vue.prototype.$charts_setting=charts_setting.config;


/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})


// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype._=_;
let thisVue=new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
export default thisVue;
