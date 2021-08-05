<template>
  <div class="SDiv" style="width:100%;">

    <el-collapse v-model="activeNames" style="width: 100%;" >
      <el-collapse-item  style="width: 100%;" name="1">
        <template slot="title">
          <i style="margin-left: 20px" class="header-icon el-icon-search"></i><span style="margin-left: 5px">查询条件</span>
        </template>
        <div class="searchDiv">
          <!--时间选择-->
          <time-choose  v-if="showdate" ref="datetime" :type="showdate" :value.sync="date"></time-choose>
          <!--时间选择-->
          <time-choose  v-if="showtime" ref="datetime" type="timerange" :value.sync="date2"></time-choose>
          <!--单位选择-->
          <tree-select  v-if="com=='multiple'" :data="data"
                        ref="coms"
                        @changeCheck="changeCheck('com')"
                        :checkData.sync="coms"
                        :check-strictly="true"
                        placeholder="请选择单位"
                        :checkedKeys="coms"></tree-select>
          <select-down-normal   v-if="com!=='multiple'" :data="data"
                                ref="coms"
                                :check-strictly="true"
                                :multiple="false"
                                @changeCheck="changeCheck('com')"
                                :checkData.sync="coms"
                                placeholder="请选择单位"
                                :checkedKeys="coms"></select-down-normal>
          <div class="searchItem" v-if="com" style="padding: 10px 5px;">
            <el-switch
              v-model="BaokouAllChildComId"
              active-text="包含子单位"
              active-value="1"
              inactive-value="0"
              inactive-text="不包含">
            </el-switch>
          </div>
          <!--部门-->
          <select-down-normal  v-if="dep=='multiple'" :data="dataForDep"
                               ref="depRef"
                               :check-strictly="false"
                               :multiple="this.dep=='multiple'"
                               @changeCheck="changeCheck('dep')"
                               :checkData.sync="deps"
                               placeholder="请选择部门"
                               :checkedKeys="deps"></select-down-normal>
          <!--用户-->
          <select-down-normal  v-if="user" :data="data2"
                               ref="users"
                               :check-strictly="false"
                               :multiple="this.user=='multiple'"
                               :checkData.sync="users"
                               placeholder="请选择用户"
                               :checkedKeys="users"></select-down-normal>
          <!--采集方式-->
          <select-down-normal  v-if="apptype" :data="data1"
                               ref="apptypes"
                               :check-strictly="false"
                               :multiple="this.apptype=='multiple'"
                               :checkData.sync="apptypes"
                               @changeCheck="changeCheck('apptype')"
                               placeholder="请选择软件采集方式"
                               :checkedKeys="apptypes"></select-down-normal>
          <!--软件-->
          <select-down-normal  v-if="app" :data="data3"
                               ref="apps"
                               :check-strictly="false"
                               :multiple="this.app=='multiple'"
                               @changeCheck="changeCheck('app')"
                               :checkData.sync="apps"
                               placeholder="请选择软件"
                               :checkedKeys="apps"></select-down-normal>
          <!--模块-->
          <select-down-normal  v-if="module" :data="data4"
                               ref="modules"
                               :check-strictly="false"
                               :multiple="this.module=='multiple'"
                               :checkData.sync="modules"
                               placeholder="请选择模块"
                               :checkedKeys="modules"></select-down-normal>
          <!--输入关键字-->
          <div class="searchItem">
            <el-input
              v-if="showkeywords"
              placeholder="请输入关键字"
              v-model="keywords">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <!--查询条件 - 安装软件信息查询-->
          <select-down-normal  v-if="showsearchterm" :data="data5"
                               ref="searchTermRef"
                               :check-strictly="false"
                               :multiple="this.showsearchterm=='multiple'"
                               :checkData.sync="searchTerms"
                               placeholder="请选择查询条件"
                               :checkedKeys="searchTerms"></select-down-normal>
          <!--是否卸载 - 安装软件信息查询-->
          <select-down-normal  v-if="showisunstall" :data="data6"
                               ref="isUnstallRef"
                               :check-strictly="false"
                               :multiple="this.showisunstall=='multiple'"
                               :checkData.sync="isUnstall"
                               placeholder="请选择是否卸载"
                               :checkedKeys="isUnstall"></select-down-normal>
          <!--输入用户名-->
          <div  class="searchItem">
            <el-input
              v-if="showusername"
              placeholder="请输入用户名"
              v-model="userName">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <!--输入设备名-->
          <div  class="searchItem">
            <el-input
              v-if="showdevname"
              placeholder="输入设备名"
              v-model="devName">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <!--超时时间范围-->
          <select-down-normal  v-if="showovertime" :data="data7"
                               ref="overTimeRef"
                               :check-strictly="false"
                               :multiple="this.showovertime=='multiple'"
                               :checkData.sync="overTimeType"
                               placeholder="请选择超时时间范围"
                               :checkedKeys="overTimeType"></select-down-normal>
          <!--查询按钮-->
          <div class="searchItem" >
            <el-button type="primary" icon="el-icon-search" @click="SearchAction">查询</el-button>
          </div>
          <div class="searchItem" >
            <el-button type="primary" icon="el-icon-s-order">导出EXCEL</el-button>
          </div>


        </div>
      </el-collapse-item>
    </el-collapse>




<!--    <div v-show="!isSmall">-->
<!--      <el-button type="primary" size="mini" title="导出EXCEL" icon="el-icon-s-order">导出</el-button>-->
<!--    </div>-->


<!--    <el-backtop>-->
        <transition name="el-zoom-in-bottom">
          <el-button v-show="isSmall" class="fiexdBtn" type="primary" size="medium" title="刷新" @click="SearchAction" icon="el-icon-refresh" circle></el-button>
        </transition>
        <transition name="el-zoom-in-bottom">
          <el-button v-show="isSmall" class="fiexdBtn1" type="primary" size="medium" title="回到顶部" icon="el-icon-arrow-up" @click="toTopFUn" circle></el-button>
        </transition>
<!--    </el-backtop>-->


    <!--    <div style="width: 100%;height: 20px;text-align: center"></div>-->
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
  import { request } from '@/network/'
  import TreeSelect from '@/components/SelectDown/comp/SelectDown'
  import SelectDownNormal from '@/components/SelectDown/comp/SelectDownNormal'
  import TimeChoose from '@/components/SelectDown/comp/TimeChoose'
  // 导入节流函数
  import throttle from 'throttle-debounce/throttle';

  const URL='/Ashx/DropSelData.ashx';

  export default {
    name: 'searchSelect',
    props: [
      'showdate', 'showtime', 'com', 'baohan','user',
      'apptype', 'app', 'module', 'showkeywords',
      'showsearchterm', 'showisunstall', 'showusername', 'showdevname',
      'showovertime', 'dep'],
    components: { TreeSelect, SelectDownNormal, TimeChoose },
    data() {
      return {
        isSmall:false,
        activeNames: ['1'],
        // 下拉菜单
        data: [],// 单位数据 - 下拉菜单
        dataForDep: [],// 部门数据 - 下拉菜单
        data1: [],// 采集方式数据 - 下拉菜单
        data2: [],// 用户数据 - 下拉菜单
        data3: [],// 软件数据 - 下拉菜单
        data4: [],// 模块数据 - 下拉菜单
        data5: [],// 查询条件数据数据 - 下拉菜单
        data6: [
          { 'menuId': 3, 'menuName': '全部' },
          { 'menuId': 0, 'menuName': '未卸载' },
          { 'menuId': 1, 'menuName': '已卸载' }
        ],// 是否卸载 - 下拉菜单
        data7: [
          { 'menuId': 0, 'menuName': '全部' },
          { 'menuId': 1, 'menuName': '24小时-48小时' },
          { 'menuId': 2, 'menuName': '48小时-72小时' },
          { 'menuId': 3, 'menuName': '72小时-120小时' },
          { 'menuId': 4, 'menuName': '120小时-168小时' },
          { 'menuId': 5, 'menuName': '大于168小时' }
        ],// 超时时间范围 - 下拉菜单

        // 选中的数据
        coms: [],// 选中的单位数据
        BaokouAllChildComId:"1",
        deps: [],// 选中的部门数据
        users: [],// 选中的用户数据
        apptypes: [],// 选中的软件类型数据
        apps: [],// 选中的软件数据
        modules: [],// 选中的模块数据
        date: '',// 当前的时间数据 带有日期，例 2020-10-20 | 2020-10-20 10:00:00
        date2: '',// 当前的时间数据 只有时间，例 10:00:00
        keywords: '',//关键字模糊查询
        searchTerms: [],//选中的查询条件
        isUnstall: [],// 选中的是否卸载的数据
        userName: '',//用户模糊查询
        devName: '',//设备名模糊查询
        overTimeType: []//选中的超时占用时长范围

      }
    },
    methods: {
      // 下拉菜单异步获取
      getCom(type) {
        // this.data = []
        // this.coms = []
        request({
          url:URL,
          // url: '/coms',
          params: {
            ty: 'GetComTree_Vue',
            // zml: 1
          }
        }).then(res => {
          if (res.reCode!=0){
            return false;
          }
          let isMultiple=this.com == 'multiple'

          this.data = res.reData
          if (type == 'init') {
            const { comid } = this.$route.params
            this.coms = comid ? comid : isMultiple ? [] : [this.data[0].menuId]
          } else {
            this.coms = isMultiple ? [] : [this.data[0].menuId]
          }
          this.$refs.coms.setCheckNodes(this.coms)
          if (this.dep) {
            this.getDep(type)
          }
          if (!this.dep && this.user) this.getUserLst(type)

        }).catch(err => {
          console.log(err)
        })
      },
      getDep(type) {
        this.dataForDep = []
        this.deps = []
        request({
          url: URL,
          params: {
            ty: 'GetDepSel',
            ComId: this.coms.join(',')
          }
        }).then(res => {
          if (res.reCode==2){
            this.$alert(res.reMsg, '错误信息', {
              confirmButtonText: '重新登录',
              callback: action => {
                this.$current.toLoginOut(this);
              }
            });
            return false;
          }
          let isMultiple = this.dep == 'multiple'
          let obj = res.reData.map(item => {
            return {
              menuId: item.DepId,
              menuName: item.DepName
            }
          })
          this.dataForDep = isMultiple ? [
            {
              menuId: 'all',
              menuName: '全选',
              childrenList: obj
            }
          ] : obj
          if (type == 'init') {
            const { depid } = this.$route.params
            this.deps = depid ? depid : isMultiple ? [] : [this.dataForDep[0].menuId]
          } else {
            this.deps = isMultiple ? [] : [this.dataForDep[0].menuId]
          }
          this.$refs.depRef.setCheckNodes(this.deps)
          if (this.user) {

            this.getUserLst(type)
          }

        }).catch(err => {
          console.log(err)
        })
      },
      getUserLst(type) {
        this.data2 = []
        this.users = []
        request({
          url: URL,
          params: {
            ty: 'GetComUsrSel',
            ComId: this.coms.join(','),
            DepId: this.deps.join(',')
          }
        }).then(res => {
          if (res.reCode==2){
            this.$alert(res.reMsg, '错误信息', {
              confirmButtonText: '重新登录',
              callback: action => {
                this.$current.toLoginOut(this);
              }
            });
            return false;
          }
          let isMultiple = this.user == 'multiple'
          let obj = res.reData.map(item => {
            return {
              menuId: item.UsrId,
              menuName: item.UsrName
            }
          })
          this.data2 = isMultiple ? [
            {
              menuId: 'all',
              menuName: '全选',
              childrenList: obj
            }
          ]: obj;

          if (type == 'init') {
            const { usrid } = this.$route.params
            this.users = usrid ? usrid : isMultiple ? [] : [this.data2[0].menuId]
          } else {
            this.users = isMultiple ? [] : [this.data2[0].menuId]
          }
          this.$refs.users.setCheckNodes(this.users)

        }).catch(err => {
          console.log(err)
        })
      },
      getAppType(type) {
        let isMultiple = this.apptype == 'multiple'
        this.data1 = isMultiple ? [
          {
            menuId: 'all', menuName: '全选', childrenList: [
              { menuId: 2, menuName: 'Agent采集方式' },
              { menuId: 1, menuName: 'Log采集方式' }
            ]
          }
        ] : [
          { menuId: 2, menuName: 'Agent采集方式' },
          { menuId: 1, menuName: 'Log采集方式' }
        ]
        if (type == 'init') {
          const { apptypeid } = this.$route.params
          this.apptypes = apptypeid ? apptypeid : isMultiple ? [] : [this.data1[0].menuId]
        } else {
          this.apptypes = isMultiple ? [] : [this.data1[0].menuId]
        }
        this.$refs.apptypes.setCheckNodes(this.apptypes)
        if (this.app) {
          this.getApp(type)
        }
      },
      getApp(type) {
        this.data3 = []
        this.apps = []
        request({
          url: URL,
          params: {
            ty: 'GetComFamSel',
          }
        }).then(res => {
          if (res.reCode==2){
            this.$alert(res.reMsg, '错误信息', {
              confirmButtonText: '重新登录',
              callback: action => {
                this.$current.toLoginOut(this);
              }
            });
            return false;
          }
          let isMultiple = this.app == 'multiple'
          let obj = res.reData.map(item => {
            return {
              menuId: item.ComFamId,
              menuName: item.ComFamName
            }
          })
          this.data3 = isMultiple ? [
            { menuId: 'all', menuName: '全选', childrenList: obj }
          ] : obj
          if (type == 'init') {
            const { appid } = this.$route.params
            this.apps = appid ? appid : isMultiple ? [] : [this.data3[0].menuId]
          } else {
            this.apps = isMultiple ? [] : [this.data3[0].menuId]
          }
          this.$refs.apps.setCheckNodes(this.apps)
          if (this.module) {
            this.getModule(type)
          }
        }).catch(err => {
          console.log(err)
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
          url: URL,
          params: {
            ty: 'GetComFamModuleLst',
            ComFamId: this.apps.join(','),
            ComFamSource: this.apptypes.join(','),
          }
        }).then(res => {
          if (res.reCode==2){
            this.$alert(res.reMsg, '错误信息', {
              confirmButtonText: '重新登录',
              callback: action => {
                this.$current.toLoginOut(this);
              }
            });
            return false;
          }
          let isMultiple = this.module == 'multiple'
          let obj = res.reData.map(item => {
            return {
              menuId: item.ModuleId,
              menuName: item.ModuleName
            }
          })
          this.data4 = isMultiple ? [
            { menuId: 'all', menuName: '全选', childrenList: obj }
          ] : obj
          if (type == 'init') {
            const { moduleid } = this.$route.params
            this.modules = moduleid ? moduleid : isMultiple ? [] : [this.data4[0].menuId]
          } else {
            this.modules = isMultiple ? [] : [this.data4[0].menuId]
          }
          this.$refs.modules.setCheckNodes(this.modules)
        }).catch(err => {
          console.log(err)
        })
      },
      getSearchTerms(type) {
        this.data5 = this.showsearchterm == 'multiple' ? [
          {
            'menuId': 'all',
            'menuName': '全选',
            'childrenList': [
              { 'menuId': 1, 'menuName': '软件名称' },
              { 'menuId': 2, 'menuName': '安装路径' },
              { 'menuId': 3, 'menuName': '卸载路径' }
            ]
          }
        ] : [
          { 'menuId': 1, 'menuName': '软件名称' },
          { 'menuId': 2, 'menuName': '安装路径' },
          { 'menuId': 3, 'menuName': '卸载路径' }
        ]
        if (type == 'init') {
          const { searchtermid } = this.$route.params
          this.searchTerms = searchtermid ? searchtermid : this.showsearchterm == 'multiple' ? [] : [this.data5[0].menuId]
        } else {
          this.searchTerms = this.showsearchterm == 'multiple' ? [] : [this.data5[0].menuId]
        }
        this.$refs.searchTermRef.setCheckNodes(this.searchTerms)
      },
      getIsUnstall(type) {
        let isMultiple = false//此处不支持多选，未开放多选功能
        // let isMultiple = this.showisunstall == 'multiple'
        if (type == 'init') {
          const { isUnstallid } = this.$route.params
          this.isUnstall = isUnstallid ? isUnstallid : isMultiple ? [] : [this.data6[0].menuId]
        } else {
          this.isUnstall = isMultiple ? [] : [this.data6[0].menuId]
        }
        this.$refs.isUnstallRef.setCheckNodes(this.isUnstall)
      },
      getOvertimeType(type) {
        let isMultiple = false//未开放多选功能
        // let isMultiple=this.showisunstall == 'multiple'
        if (type == 'init') {
          const { overtimeType } = this.$route.params
          this.overTimeType = overtimeType ? overtimeType : isMultiple ? [] : [this.data7[0].menuId]
        } else {
          this.overTimeType = isMultiple ? [] : [this.data7[0].menuId]
        }
        this.$refs.overTimeRef.setCheckNodes(this.overTimeType)
      },
      // 下拉菜单之间的联动关系管理
      changeCheck(node) {
        let type = 'change'
        switch (node) {
          case 'com':
            if (this.dep) this.getDep(type)
            if (!this.dep && this.user) this.getUserLst(type)
            break
          case 'dep':
            if (this.user) this.getUserLst(type)
            break
          case 'apptype':
            if (this.app)this.getApp(type);
            if (!this.app&&this.module)this.getModule(type);
            break
          case 'app':
            if (this.module) this.getModule(type)
            break
        }

      },
      // 向外输出结果s
      getSearchData() {
        return {
          coms: this.coms,
          BaokouAllChildComId:this.BaokouAllChildComId,
          deps: this.deps,
          users: this.users,
          apptypes: this.apptypes,
          apps: this.apps,
          modules: this.modules,
          date: this.date,
          date2: this.date2,
          keywords: this.keywords,
          searchTerms: this.searchTerms,
          isUnstall: this.isUnstall,
          userName: this.userName,
          devName: this.devName,
          overTimeType: this.overTimeType
        }
      },
      // 查询执行的函数
      SearchAction(){
        this.$emit('searchAction')
      },
      toTopFUn(){
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      }
    },
    mounted() {
      // 默认加载
      if (this.com) {
        this.getCom('init')
        this.BaokouAllChildComId=this.baohan;
      }
      // 被联动数据，默认不在此初始加载,要写在联动管理里
      if (this.dep && !this.com) {
        this.getDep('init')
      }
      if (this.user && !this.com && !this.dep) {
        this.getUserLst('init')
      }
      if (this.apptype) {
        this.getAppType('init')
      }
      if (this.app && !this.apptype) {
        this.getApp('init')
      }
      if (this.module && !this.app) {
        this.getModule('init')
      }
      if (this.showsearchterm) {
        this.getSearchTerms('init')
      }
      if (this.showisunstall) {
        this.getIsUnstall('init')
      }
      if (this.showovertime) {
        this.getOvertimeType('init')
      }



      // 滚动显示
      window.onscroll = ()=>throttle(300, scrollFun());
      const _this=this;
      function scrollFun() {
        var scrollTop = document.body.scrollTop || (document.documentElement && document.documentElement.scrollTop);
        if (scrollTop >=400) {
          _this.isSmall=true;
        } else{
          _this.isSmall=false;
        }
      }




    }
  }
</script>

<style>
  .SDiv .searchDiv {
    width: 100%;
    background: #F2F6FC;
    display: -ms-flex;
    display: -o-flex;
    display: -moz-flex;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;

  }

  .SDiv .searchItem {
    padding: 2px 2.5px;
  }
  .SDiv .fiexdBtn{
    position: fixed;
    bottom: 150px;
    right: 10px;
    z-index: 1000;
  }

  .SDiv .fiexdBtn1{
    position: fixed;
    bottom: 100px;
    right: 10px;
    z-index: 1000;
  }

  .SDiv .el-collapse-item__header{
    /*text-indent: 20px;*/
  }

</style>

