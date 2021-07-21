<template>
  <div>
    <div class="searchDiv">
      <!--时间选择-->
      <time-choose v-if="showdate" ref="datetime" type="datetimerange" :value.sync="date"></time-choose>
      <!--单位选择-->
      <tree-select v-if="com" :data="data"
                   ref="coms"
                   multiple
                   @changeCheck="changeCheck('com')"
                   :checkData.sync="coms"
                   :check-strictly="true"
                   placeholder="请选择单位"
                   :checkedKeys="coms"></tree-select>
      <!--用户-->
      <select-down-normal v-if="user" :data="data2"
                          ref="users"
                          :check-strictly="false"
                          multiple
                          :checkData.sync="users"
                          placeholder="请选择用户"
                          :checkedKeys="users"></select-down-normal>
      <!--软件-->
      <select-down-normal v-if="app" :data="data3"
                          ref="apps"
                          :check-strictly="false"
                          multiple
                          @changeCheck="changeCheck('app')"
                          :checkData.sync="apps"
                          placeholder="请选择软件"
                          :checkedKeys="apps"></select-down-normal>
      <!--模块-->
      <select-down-normal v-if="module" :data="data4"
                          ref="apps"
                          :check-strictly="false"
                          multiple
                          :checkData.sync="modules"
                          placeholder="请选择模块"
                          :checkedKeys="modules"></select-down-normal>
    </div>
    <p>{{date}}</p>
    <p>{{coms}}</p>
    <p>{{users}}</p>
    <p>{{apps}}</p>
    <p>{{modules}}</p>
  </div>
</template>

<script>
  import {request} from '@/network/';
  import TreeSelect from '@/components/SelectDown/comp/SelectDown'
  import SelectDownNormal from '@/components/SelectDown/comp/SelectDownNormal'
  import TimeChoose from '@/components/SelectDown/comp/TimeChoose'

  var menus = [
    {
      'menuId': 1,
      'menuName': '系统管理',
      'childrenList': [
        {
          'menuId': 100,
          'menuName': '用户管理',
          'childrenList': [
            {
              'menuId': 1000,
              'menuName': '用户查询'
            },
            {
              'menuId': 1001,
              'menuName': '用户新增'
            },
            {
              'menuId': 1002,
              'menuName': '用户修改'
            },
            {
              'menuId': 1003,
              'menuName': '用户删除'
            },
            {
              'menuId': 1004,
              'menuName': '用户删除1'
            },
            {
              'menuId': 1005,
              'menuName': '用户删除2'
            },
            {
              'menuId': 1009,
              'menuName': '用户删除3'
            },
            {
              'menuId': 10010,
              'menuName': '用户删除4'
            }
          ]
        },
        {
          'menuId': 101,
          'menuName': '角色管理',
          'childrenList': [
            {
              'menuId': 1006,
              'menuName': '角色查询'
            },
            {
              'menuId': 1007,
              'menuName': '角色新增'
            },
            {
              'menuId': 1008,
              'menuName': '角色修改'
            },
            {
              'menuId': 1011,
              'menuName': '删除角色'
            }
          ]
        }
      ]
    }
  ]
  var menus2 = [
    {
      'menuId': 1,
      'menuName': '全选',
      'childrenList': [
        {
          'menuId': 100,
          'menuName': '用户1'
        },
        {
          'menuId': 101,
          'menuName': '用户2'
        }
      ]
    }
  ]
  var menus3 = [
    {
      'menuId': 101,
      'menuName': '用户',
      'childrenList': []
    }
  ]
  var menus4 = [
    {
      'menuId': 101,
      'menuName': '软件',
      'childrenList': []
    }
  ]
  var menus5 = [
    {
      'menuId': 0,
      'menuName': '全选',
      'childrenList': [
        {
          'menuId': 1,
          'menuName': '模块1'
        },
        {
          'menuId': 2,
          'menuName': '模块2'
        }
      ]
    }
  ]
  export default {
    name: 'searchSelect',
    props: ['showdate', 'com', 'user', 'app', 'module'],
    components: { TreeSelect, SelectDownNormal, TimeChoose },
    data() {
      return {
        data: [],// 单位数据 - 下拉菜单
        data2: [],// 用户数据 - 下拉菜单
        data3: [],// 软件数据 - 下拉菜单
        data4: [],// 模块数据 - 下拉菜单
        coms: [],// 选中的单位数据
        users: [],// 选中的用户数据
        apps: [],// 选中的软件数据
        modules: [],// 选中的模块数据
        date: ''// 当前的时间数据

      }
    },
    methods: {
      // 下拉菜单异步获取
      getCom() {
        this.data = []
        this.coms = []
        setTimeout(() => {
          this.data = menus
          this.coms = []
        }, 3000)
      },
      getUserLst() {
        this.data2 = []
        this.users = []
        setTimeout(() => {
          this.data2 = menus2
          this.users = []
        }, 3000)
        request({
          // url:'/Ashx/ISystemOverview.ashx',
          url:'/Ashx/DropSelData.ashx',
          data:{
            ty:'GetComSel'
          }
        }).then((res,err)=>{
          console.log(res)
          console.log(err)
        })
      },
      getApp() {
        this.data3 = []
        this.apps = []
        setTimeout(() => {
          this.data3 = menus4
          this.apps = []
        }, 3000)
      },
      getModule() {
        this.data4 = []
        this.modules = []
        setTimeout(() => {
          this.data4 = menus5
          this.modules = []
        }, 3000)
      },
      // 下拉菜单之间的联动关系管理
      changeCheck(node) {
        switch (node) {
          case 'com':
            if (this.user) {
              this.getUserLst();//
            }
            break
          case 'app':
            if (this.module) {
              this.getModule();//
            }
              break;
        }

      }
    },
    mounted() {
      // 默认加载
      if (this.com) {
        this.getCom()
      }
      // 被联动数据，默认不在此初始加载,要卸载联动管理里
      if (this.user&&!this.com){
        this.getUserLst();
      }
      if (this.app) {
        this.getApp()
      }
      if (this.module&&!this.app){
        this.getModule();
      }
    }
  }
</script>

<style>
  .searchDiv {
    width: 100%;
    display: -ms-flex;
    display: -o-flex;
    display: -moz-flex;
    display: flex;
    flex-wrap: wrap

  }

  .searchItem {
    width: 230px;
    padding: 10px;
  }
</style>

