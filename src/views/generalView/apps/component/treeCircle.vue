<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">

      <!--使用分布-->
      <el-tab-pane label="使用分布" name="first">
        <div id="guanxiId" style="width: 100%;" :style="{height:height}"></div>
      </el-tab-pane>

      <!--安装分布-->
      <el-tab-pane label="安装分布" name="second">
        <div id="guanxiId2" style="width: 100%;" :style="{height:height}"></div>
      </el-tab-pane>

      <!--关联软件-->
      <el-tab-pane label="关联软件" name="third">
        <div id="guanxiId3" style="width: 100%;" :style="{height:height}"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { request } from '@/network'

  export default {
    name: 'treeCircle',
    props: {
      searchinfo: {
        type: Object,
        default: {}
      },
      height:{
        type:String,
        default:'350px'
      }
    },
    data() {
      return {
        activeName: 'first',
        charts: {
          guanxiEcharts: null,
          guanxiEcharts2: null,
          guanxiEcharts3: null
        }
      }
    },
    components: {},
    mounted() {
      this.init()
    },
    methods: {
      init() {
        // 创建echarts对象
        if (!this.charts.guanxiEcharts) this.charts.guanxiEcharts = this.$echarts.init(document.getElementById('guanxiId'))
        if (!this.charts.guanxiEcharts2) this.charts.guanxiEcharts2 = this.$echarts.init(document.getElementById('guanxiId2'))
        if (!this.charts.guanxiEcharts3) this.charts.guanxiEcharts3 = this.$echarts.init(document.getElementById('guanxiId3'))
        // 渲染echarts图表 - 暂无数据的提示
        this.charts.guanxiEcharts.setOption(this.$charts_setting.noDataOption,true)
        this.charts.guanxiEcharts2.setOption(this.$charts_setting.noDataOption,true)
        this.charts.guanxiEcharts3.setOption(this.$charts_setting.noDataOption,true)
        // 绑定resize函数
        new ResizeObserver(entries => {
          // 注意，entres是个数组，数组项为每个需要监听的DOM节点
          entries.forEach(entry => {
            this.resizeFun();
          })
        }).observe(document.querySelector('#guanxiId'))
        new ResizeObserver(entries => {
          // 注意，entres是个数组，数组项为每个需要监听的DOM节点
          entries.forEach(entry => {
            this.resizeFun();
          })
        }).observe(document.querySelector('#guanxiId2'))
        new ResizeObserver(entries => {
          // 注意，entres是个数组，数组项为每个需要监听的DOM节点
          entries.forEach(entry => {
            this.resizeFun();
          })
        }).observe(document.querySelector('#guanxiId3'))
      },
      handleClick() {
        // 切换的时候执行resize事件
        setTimeout(() => {
          this.resizeFun()
        }, 20)
      },
      resizeFun() {
        if (this.charts.guanxiEcharts) this.charts.guanxiEcharts.resize()
        if (this.charts.guanxiEcharts2) this.charts.guanxiEcharts2.resize()
        if (this.charts.guanxiEcharts3) this.charts.guanxiEcharts3.resize()
      },
      guanxiFun() {
        const _this = this
        let guanxiEcharts = this.charts.guanxiEcharts
        guanxiEcharts.showLoading(this.$charts_setting.loadingOption)
        request({
          // url: './json/childjson.json',
          url: '/Ashx/ISystemOverview.ashx',
          params: {
            ty: 'GetSoftView_SoftUseFenBu',
            StartDate: _this.searchinfo.StartDate,
            EndDate: _this.searchinfo.EndDate,
            ComId: _this.searchinfo.ComId.join(','),
            ComFamId: _this.searchinfo.ComFamId.join(','),
            BaokouAllChildComId: _this.searchinfo.BaokouAllChildComId,
            Is_Need_Count: _this.searchinfo.Is_Need_Count
          }
        }).then(res => {
          guanxiEcharts.hideLoading()
          if (res.returncode == 0) {
            let tooltip=_.cloneDeep(this.$charts_setting.tooltipOption);
            let legend=_.cloneDeep(this.$charts_setting.legendOption);
            let label=_.cloneDeep(this.$charts_setting.labelOption);
            colors = _.cloneDeep(_this.$charts_setting.colorList)
            var getdata = function getData() {
              let arr = []
              arr.push(res.returndata)
              arr = handle(arr, 0, colors)
              return arr
            }
            let option
            if (res.returndata.children.length) {
              option = {
                title: {
                  text: ''
                },
                type: 'tree',
                // backgroundColor: "#000",
                tooltip,
                series: [{
                  name: '有效工作用时（时）',
                  type: 'tree',
                  hoverAnimation: true, //hover样式
                  data: getdata(),
                  top: 30,
                  bottom: 30,
                  left: 0,
                  right: 0,
                  layout: 'radial',
                  symbol: 'circle',
                  symbolSize: 10,
                  nodePadding: 20,
                  animationDurationUpdate: 750,
                  expandAndCollapse: true, //子树折叠和展开的交互，默认打开
                  initialTreeDepth: 2,//显示到第几级树
                  roam: true, //是否开启鼠标缩放和平移漫游。scale/move/true
                  focusNodeAdjacency: true,
                  itemStyle: {
                    borderWidth: 1
                  },
                  label,
                  lineStyle: {
                    width: 1,
                    curveness: 0.5
                  }
                }]
              }
            } else {
              option = _.cloneDeep(this.$charts_setting.noDataOption)
            }
            guanxiEcharts.setOption(option,true)
            guanxiEcharts.resize()

            // 树形图点击用户跳转
            guanxiEcharts.on('click', function(params) {
              if (params.data.children.length == 0 && params.data.Myid != 0) {

                layui.define(['jquery', 'miniMenu', 'element', 'miniTab', 'miniTheme'], function(exports) {
                  var miniTab = layui.miniTab
                  miniTab.openNewTabByIframe({
                    title: '【查询】用户概览',
                    href: '/pages/usr_ZH.html?' +
                      'datetype=' + DateTypeForSave +
                      '&&startdate=' + StartDateForSave +
                      '&&enddate=' + EndDateForSave +
                      '&&comid=' + ComIdForSave +
                      '&&usrid=' + params.data.Myid +
                      '&&comfamid=' + AppIdForSave
                  })

                })
                // window.location.href = ;
              }
            })
          } else if (res.returncode == 2) {
            if (_this.$store.state.login.logState=='login'){
              this.$alert(res.returnmsg, '错误信息', {
                confirmButtonText: '重新登录',
                callback: action => {
                  this.$current.toLoginOut(this)
                  this.$store.commit('CHANGE_LOG_STATE','logout')
                }
              })
            }
          } else {
            let errInfo=this.$charts_setting.errOption(res.returnmsg)
            this.charts.guanxiEcharts.setOption(errInfo,true)
          }
        })

      },
      guanxiFun2() {
        const _this = this
        let guanxiEcharts = this.charts.guanxiEcharts2
        guanxiEcharts.showLoading(this.$charts_setting.loadingOption)

        request({
          // url:'./json/childjson3.json',
          url: '/Ashx/ISystemOverview.ashx',
          params: {
            ty: 'GetSoftView_SoftAzFenBu',
            StartDate: _this.searchinfo.StartDate,
            EndDate: _this.searchinfo.EndDate,
            ComId: _this.searchinfo.ComId.join(','),
            ComFamId: _this.searchinfo.ComFamId.join(','),
            BaokouAllChildComId: _this.searchinfo.BaokouAllChildComId,
            Is_Need_Count: _this.searchinfo.Is_Need_Count
          }
        })
          .then(res => {
            guanxiEcharts.hideLoading()
            if (res.returncode == 0) {
              let tooltip=_.cloneDeep(this.$charts_setting.tooltipOption);
              let legend=_.cloneDeep(this.$charts_setting.legendOption);
              let label=_.cloneDeep(this.$charts_setting.labelOption);
              colors = _.cloneDeep(_this.$charts_setting.colorList)
              var getData = function getData() {
                let arr = []
                arr.push(res.returndata)
                arr = handle(arr, 0, colors)
                return arr
              }
              let option
              if (res.returndata.children.length) {
                option = {
                  title: {
                    text: ''
                  },
                  type: 'tree',
                  // backgroundColor: "#000",
                  tooltip,
                  series: [{
                    name: '有效工作用时（时）',
                    type: 'tree',
                    hoverAnimation: true, //hover样式
                    data: getData(),
                    top: 30,
                    bottom: 30,
                    left: 0,
                    right: 0,
                    layout: 'radial',
                    symbol: 'circle',
                    symbolSize: 10,
                    nodePadding: 20,
                    animationDurationUpdate: 750,
                    expandAndCollapse: true, //子树折叠和展开的交互，默认打开
                    initialTreeDepth: 1,//显示到第几级树
                    roam: true, //是否开启鼠标缩放和平移漫游。scale/move/true
                    focusNodeAdjacency: true,
                    itemStyle: {
                      borderWidth: 1
                    },
                    label,
                    lineStyle: {
                      width: 1,
                      curveness: 0.5
                    }
                  }]
                }
              } else {
                option = _.cloneDeep(this.$charts_setting.noDataOption)
              }
              guanxiEcharts.setOption(option,true)
              guanxiEcharts.resize()

            } else if (res.returncode == 2) {
              if (_this.$store.state.login.logState=='login'){
                this.$alert(res.returnmsg, '错误信息', {
                  confirmButtonText: '重新登录',
                  callback: action => {
                    this.$current.toLoginOut(this)
                    this.$store.commit('CHANGE_LOG_STATE','logout')
                  }
                })
              }
            } else {
              let errInfo=this.$charts_setting.errOption(res.returnmsg)
              this.charts.guanxiEcharts2.setOption(errInfo,true)
            }

          })

      },
      guanxiFun3() {
        const _this = this
        let guanxiEcharts = this.charts.guanxiEcharts3
        guanxiEcharts.showLoading(this.$charts_setting.loadingOption)
        request({
          // url:'./json/childjson3.json',
          url: '/Ashx/ISystemOverview.ashx',
          params: {
            ty: 'GetSoftView_SoftRelation',
            StartDate: _this.searchinfo.StartDate,
            EndDate: _this.searchinfo.EndDate,
            ComId: _this.searchinfo.ComId.join(','),
            ComFamId: _this.searchinfo.ComFamId.join(','),
            BaokouAllChildComId: _this.searchinfo.BaokouAllChildComId,
            Is_Need_Count: _this.searchinfo.Is_Need_Count
          }
        })
          .then(res => {
            guanxiEcharts.hideLoading()
            if (res.returncode == 0) {
              let tooltip=_.cloneDeep(this.$charts_setting.tooltipOption);
              let legend=_.cloneDeep(this.$charts_setting.legendOption);
              let label=_.cloneDeep(this.$charts_setting.labelOption);
              colors = _.cloneDeep(_this.$charts_setting.colorList)

              var getData = function getData() {
                let arr = []
                arr.push(res.returndata)
                arr = handle(arr, 0, colors)
                return arr
              }
              let option

              if (res.returndata.children.length) {
                option = {
                  title: {
                    text: ''
                  },
                  type: 'tree',
                  tooltip,
                  series: [{
                    name: '有效工作用时（时）',
                    type: 'tree',
                    hoverAnimation: true, //hover样式
                    data: getData(),
                    top: 30,
                    bottom: 30,
                    left: 0,
                    right: 0,
                    layout: 'radial',
                    symbol: 'circle',
                    symbolSize: 10,
                    nodePadding: 20,
                    animationDurationUpdate: 750,
                    expandAndCollapse: true, //子树折叠和展开的交互，默认打开
                    initialTreeDepth: 1,//显示到第几级树
                    roam: true, //是否开启鼠标缩放和平移漫游。scale/move/true
                    focusNodeAdjacency: true,
                    itemStyle: {
                      borderWidth: 1
                    },
                    label,
                    lineStyle: {
                      width: 1,
                      curveness: 0.5
                    }
                  }]
                }
              } else {
                option = _.cloneDeep(this.$charts_setting.noDataOption)
              }

              guanxiEcharts.setOption(option,true)
              guanxiEcharts.resize()

            } else if (res.returncode == 2) {
              if (_this.$store.state.login.logState=='login'){
                this.$alert(res.returnmsg, '错误信息', {
                  confirmButtonText: '重新登录',
                  callback: action => {
                    this.$current.toLoginOut(this)
                    this.$store.commit('CHANGE_LOG_STATE','logout')
                  }
                })
              }
            } else {
              let errInfo=this.$charts_setting.errOption(res.returnmsg)
              this.charts.guanxiEcharts3.setOption(errInfo,true)

            }
          })

      },

    }
  }
  let colors
  let color = '#00f6ff'

  function handle(data, index) {
    //index标识第几层
    return data.map(function(item, index2) {
      //计算出颜色
      if (index == 1) {
        color = colors.find(function(item, eq) {
          return eq == index2 % 10
        })
      }
      // 设置节点大小
      if (index === 0 || index === 1) {
        item.label = {
          position: 'inside'
          //   rotate: 0,
          //   borderRadius: "50%",
        }
      }
      // 设置label大小
      switch (index) {
        case 0:
          item.symbolSize = 70
          break
        case 1:
          item.symbolSize = 50
          break
        default:
          item.symbolSize = 10
          break
      }
      // 设置线条颜色
      item.lineStyle = {
        color: color
      }

      if (item.children) { //存在子节点
        item.itemStyle = {
          borderColor: color,
          color: color
        }
        item.children = handle(item.children, index + 1, color)
      } else { //不存在
        item.itemStyle = {
          color: 'transparent',
          borderColor: color
        }
      }
      return item
    })
  }


</script>

<style scoped>

</style>
