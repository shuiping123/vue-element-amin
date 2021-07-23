<template>
  <div>
    <div class="searchDiv">
      <!--时间选择-->
      <time-choose v-if="showdate" ref="datetime" type="datetimerange" :value.sync="date"></time-choose>
      <!--时间选择-->
      <time-choose v-if="showtime" ref="datetime" type="timerange" :value.sync="date2"></time-choose>
      <!--单位选择-->
      <tree-select v-if="com=='mutiple'" :data="data"
                   ref="coms"
                   @changeCheck="changeCheck('com')"
                   :checkData.sync="coms"
                   :check-strictly="true"
                   placeholder="请选择单位"
                   :checkedKeys="coms"></tree-select>
      <select-down-normal v-if="com!=='mutiple'" :data="data"
                          ref="coms"
                          :check-strictly="true"
                          :multiple="false"
                          @changeCheck="changeCheck('com')"
                          :checkData.sync="coms"
                          placeholder="请选择单位"
                          :checkedKeys="coms"></select-down-normal>
      <!--用户-->
      <select-down-normal v-if="user" :data="data2"
                          ref="users"
                          :check-strictly="false"
                          :multiple="this.user=='mutiple'"
                          :checkData.sync="users"
                          placeholder="请选择用户"
                          :checkedKeys="users"></select-down-normal>
      <!--采集方式-->
      <select-down-normal v-if="apptype" :data="data1"
                          ref="apptypes"
                          :check-strictly="false"
                          :multiple="this.apptype=='mutiple'"
                          :checkData.sync="apptypes"
                          @changeCheck="changeCheck('apptype')"
                          placeholder="请选择软件采集方式"
                          :checkedKeys="apptypes"></select-down-normal>
      <!--软件-->
      <select-down-normal v-if="app" :data="data3"
                          ref="apps"
                          :check-strictly="false"
                          :multiple="this.app=='mutiple'"
                          @changeCheck="changeCheck('app')"
                          :checkData.sync="apps"
                          placeholder="请选择软件"
                          :checkedKeys="apps"></select-down-normal>
      <!--模块-->
      <select-down-normal v-if="module" :data="data4"
                          ref="modules"
                          :check-strictly="false"
                          :multiple="this.module=='mutiple'"
                          :checkData.sync="modules"
                          placeholder="请选择模块"
                          :checkedKeys="modules"></select-down-normal>
    </div>
<!--    <p>{{date}}</p>-->
<!--    <p>{{date2}}</p>-->
<!--    <p>单位：{{coms}}</p>-->
<!--    <p>用户：{{users}}</p>-->
<!--    <p>采集方式：{{apptypes}}</p>-->
<!--    <p>软件：{{apps}}</p>-->
<!--    <p>模块：{{modules}}</p>-->
  </div>
</template>

<script>
  import {request} from '@/network/';
  import TreeSelect from '@/components/SelectDown/comp/SelectDown'
  import SelectDownNormal from '@/components/SelectDown/comp/SelectDownNormal'
  import TimeChoose from '@/components/SelectDown/comp/TimeChoose'

  export default {
    name: 'searchSelect',
    props: ['showdate','showtime', 'com', 'user', 'apptype', 'app', 'module'],
    components: { TreeSelect, SelectDownNormal, TimeChoose },
    data() {
      return {
        data: [],// 单位数据 - 下拉菜单
        data1: [],// 采集方式数据 - 下拉菜单
        data2: [],// 用户数据 - 下拉菜单
        data3: [],// 软件数据 - 下拉菜单
        data4: [],// 模块数据 - 下拉菜单
        coms: [],// 选中的单位数据
        users: [],// 选中的用户数据
        apptypes: [],// 选中的软件数据
        apps: [],// 选中的软件数据
        modules: [],// 选中的模块数据
        date: '',// 当前的时间数据 带有日期，例 2020-10-20 | 2020-10-20 10:00:00
        date2: ''// 当前的时间数据 只有时间，例 10:00:00
      }
    },
    methods: {
      // 下拉菜单异步获取
      getCom(type) {
        // this.data = []
        // this.coms = []
        request({
          // url:'/Ashx/ISystemOverview.ashx',
          url:'/coms',
          data:{
            ty:'GetComSel',
            zml:1
          }
        }).then(res=>{
          if (type=='init'){
            this.data = res.data
            const {comid}=this.$route.params;
            this.coms = comid?comid:this.com=='mutiple'?[]:[this.data[0].menuId];
            this.$refs.coms.setCheckNodes(this.coms)
          }else {

            this.data = res.data
            this.coms = this.com=='mutiple'?[]:[this.data[0].menuId];
            this.$refs.coms.setCheckNodes(this.coms)
          }
          if (this.user){
            this.getUserLst(type);
          }

        }).catch(err=>{
          console.log(err);
        })
      },
      getUserLst(type) {
        this.data2 = []
        this.users = []
        request({
          // url:'/Ashx/ISystemOverview.ashx',
          url:'/users',
          data:{
            ty:'GetComSel',
            zml:1
          }
        }).then(res=>{
          if (type=='init'){
            this.data2 = res.data
            const {usrid}=this.$route.params;
            this.users = usrid?usrid:this.user=='mutiple'?[]:[this.data2[0].menuId];
            this.$refs.users.setCheckNodes(this.users)
          }else {
            this.data2 = res.data;
            this.users = this.user=='mutiple'?[]:[this.data2[0].menuId];
            this.$refs.users.setCheckNodes(this.users)
          }

        }).catch(err=>{
          console.log(err);
        })
      },
      getAppType(type){
        this.data1 = []
        this.apptypes = []
        request({
          // url:'/Ashx/ISystemOverview.ashx',
          url:'/apptypes',
          data:{
            ty:'GetComSel',
            zml:1
          }
        }).then(res=>{
          if (type=='init'){
            this.data1 = res.data
            const {apptypeid}=this.$route.params;
            this.apptypes = apptypeid?apptypeid:this.apptype=='mutiple'?[]:[this.data1[0].menuId];
            this.$refs.apptypes.setCheckNodes(this.apptypes)
          }else {
            this.data1 = res.data;
            this.apptypes = this.apptype=='mutiple'?[]:[this.data1[0].menuId];
            this.$refs.apptypes.setCheckNodes(this.apptypes)
          }
          if (this.app){
            this.getApp(type);
          }

        }).catch(err=>{
          console.log(err);
        })

        // setTimeout(() => {
        //   this.data1 = menus1
        //   this.apptypes = []
        //   this.getApp(type);
        // }, 3000)
      },
      getApp(type) {
        this.data3 = []
        this.apps = []
        request({
          // url:'/Ashx/ISystemOverview.ashx',
          url:'/apps',
          data:{
            ty:'GetComSel',
            zml:1
          }
        }).then(res=>{
          if (type=='init'){
            this.data3 = res.data
            const {appid}=this.$route.params;
            this.apps = appid?appid:this.app=='mutiple'?[]:[this.data3[0].menuId];
            this.$refs.apps.setCheckNodes(this.apps)
          }else {
            this.data3 = res.data;
            this.apps = this.app=='mutiple'?[]:[this.data3[0].menuId];
            this.$refs.apps.setCheckNodes(this.apps)
          }
          if (this.module){
            this.getModule(type);
          }

        }).catch(err=>{
          console.log(err);
        })
        // setTimeout(() => {
        //   this.data3 = menus4
        //   this.apps = []
        //   this.getModule(type);
        // }, 3000)
      },
      getModule(type) {
        this.data4 = []
        this.modules = []
        request({
          // url:'/Ashx/ISystemOverview.ashx',
          url:'/modules',
          data:{
            ty:'GetComSel',
            zml:1
          }
        }).then(res=>{
          if (type=='init'){
            this.data4 = res.data
            const {moduleid}=this.$route.params;
            this.modules = moduleid?moduleid:this.module=='mutiple'?[]:[this.data4[0].menuId];
            this.$refs.modules.setCheckNodes(this.modules)
          }else {
            this.data4 = res.data;
            this.modules = this.module=='mutiple'?[]:[this.data4[0].menuId];
            this.$refs.modules.setCheckNodes(this.modules)
          }
          // this.$refs.modules.setCheckNodes([1])

        }).catch(err=>{
          console.log(err);
        })
        // setTimeout(() => {
        //   this.data4 = menus5
        //   this.modules = []
        // }, 3000)
      },
      // 下拉菜单之间的联动关系管理
      changeCheck(node) {
        switch (node) {
          case 'com':
            if (this.user) {
              this.getUserLst('change');//
            }
            break;
          case 'apptype':
            if (this.app) {
              this.getApp('change');//
            }
            break;
          case 'app':
            if (this.module) {
              this.getModule('change');//
            }
              break;
        }

      },
      // 向外输出结果
      getSearchData(){
        return {
          date:this.date,
          time:this.date2,
          coms:this.coms,
          users:this.users,
          apptypes:this.apptypes,
          apps:this.apps,
          modules:this.modules
        }
      }
    },
    mounted() {
      // 默认加载
      if (this.com) {
        this.getCom('init')
      }
      // 被联动数据，默认不在此初始加载,要写在联动管理里
      if (this.user&&!this.com){
        this.getUserLst('init');
      }
      if (this.apptype) {
        this.getAppType('init')
      }
      if (this.app&&!this.apptype) {
        this.getApp('init')
      }
      if (this.module&&!this.app){
        this.getModule('init');
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
    flex-wrap: wrap;
    padding: 10px;

  }

  .searchItem {
    padding: 2px 2.5px;
  }
</style>

