<template>
  <div >
    <div class="searchDiv">
      <!--时间选择-->
      <time-choose v-if="showdate" ref="datetime" type="datetimerange" :value.sync="date"></time-choose>
      <!--单位选择-->
      <tree-select v-if="com" :data="data"
                   ref="coms"
                   multiple
                   :checkData.sync="value"
                   :check-strictly="true"
                   placeholder="请选择单位"
                   :checkedKeys="value"></tree-select>
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
                          :checkData.sync="apps"
                          placeholder="请选择软件"
                          :checkedKeys="apps"></select-down-normal>
    </div>
    <p>{{value}}</p>
    <p>{{users}}</p>
    <p>{{apps}}</p>
    <p>{{date}}</p>
  </div>
</template>

<script>
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
  export default {
    name: 'searchSelect',
    props:['showdate','com','user','app'],
    components: { TreeSelect, SelectDownNormal, TimeChoose },
    data() {
      return {
        data: [],
        data2: [],
        data3: [],
        value: [],
        users: [],
        apps: [],
        defaultdate: ['2021-10-20', '2021-11-20'],
        date: ''

      }
    },
    watch:{
      value(newVal){
        if (newVal[0]==1){
          this.users=[];
          this.data2=menus2;
        }else {
          this.users=[];
          this.data2=menus3;
        }
      }
    },
    methods: {
      getCom(){
        setTimeout(()=>{
          this.data=menus;
        },3000)
      },
      getUserLst(){
        setTimeout(()=>{
          this.data2=menus2;
        },3000)
      },
      getApp(){
        setTimeout(()=>{
          this.data3=menus4;
        },3000)
      }
    },
    mounted() {
      if (this.com){
        this.getCom();
      }
      if (this.user){
        this.getUserLst();
      }
      if (this.app){
        this.getApp();
      }
    }
  }
</script>

<style>
  .searchDiv{
    width: 100%;
    display: -ms-flex;
    display: -o-flex;
    display: -moz-flex;
    display: flex;
    flex-wrap:wrap

  }
  .searchItem{
    width: 230px;
    padding: 10px;
  }
</style>

