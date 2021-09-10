<template>
  <div class="cardBoxItem">
    <el-card shadow="hover">
      <card-box style="height: 370px">
        <div class="cardBoxTitle">
          <span>软件峰值及访问量详情</span>
          <i class="el-icon-download downExcel floatBtn" title="导出excel" @click="downExcel"/>
        </div>
        <div class="peakValue cardBoxContent"></div>
      </card-box>
    </el-card>
  </div>
</template>

<script>
  import { request } from '../../../../network'
  import ResizeObserverPolyfill from 'resize-observer-polyfill';

  export default {
    name: 'peakValue',
    data() {
      return {
        myChart: null,
        data: []
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      // 初始化
      init() {
        let dom = this.$el.getElementsByClassName('peakValue')[0]
        // 创建echarts对象
        if (!this.myChart) this.myChart = this.$echarts.init(dom)
        // 实例化对象 - 渲染
        this.myChart.setOption(_.cloneDeep(this.$charts_setting.noDataOption), true)
        // 绑定resize事件
        new ResizeObserverPolyfill(entries => {
          // 注意，entres是个数组，数组项为每个需要监听的DOM节点
          entries.forEach(entry => {
            this.myChart.resize()
          })
        }).observe(dom)
      },
      // 渲染
      renderChart(searchInfo) {
        this.myChart.showLoading(_.cloneDeep(this.$charts_setting.loadingOption), true)
        this.data = null
        request({
          url: '/Ashx/ISystemOverview.ashx',
          params: {
            ty: 'GetAllSoftView_SoftFzFwl',
            StartDate: searchInfo.StartDate,
            EndDate: searchInfo.EndDate,
            Is_Need_Count: searchInfo.Is_Need_Count
          }
        }).then(res => {
          this.myChart.hideLoading()
          if (res.returncode == 0) {
            let colorList = _.cloneDeep(this.$charts_setting.colorList)
            let tooltip = _.cloneDeep(this.$charts_setting.tooltipOption)
            let legend = _.cloneDeep(this.$charts_setting.legendOption)
            let label = _.cloneDeep(this.$charts_setting.labelOption)
            let xAxis = _.cloneDeep(this.$charts_setting.xAxisOption)
            let yAxis1 = _.cloneDeep(this.$charts_setting.yAxisOption)
            let yAxis2 = _.cloneDeep(this.$charts_setting.yAxisOption)
            let dataZoom = _.cloneDeep(this.$charts_setting.dataZoomOption)

            let dataArr = res.returndata
            var xId = dataArr.map(function(item) {
              return item.Myid
            })

            var coms = dataArr.map(function(item) {
              return item.name
            })

            let bar1 = _.cloneDeep(this.$charts_setting.barOption)
            let bar2 = _.cloneDeep(this.$charts_setting.barOption)
            let bar3 = _.cloneDeep(this.$charts_setting.barOption)
            let line = _.cloneDeep(this.$charts_setting.lineOption)
            Object.assign(bar1, {
              yAxisIndex: 0,
              name: '授权总数',
              data: dataArr.map(function(item) {
                return item.value_4
              })
            })
            Object.assign(bar2, {
              yAxisIndex: 0,
              name: '最大并发峰值',
              data: dataArr.map(function(item) {
                return item.value
              })
            })
            Object.assign(bar3, {
              yAxisIndex: 0,
              name: '平均并发峰值',
              data: dataArr.map(function(item) {
                return item.value_2
              })
            })
            Object.assign(line, {
              yAxisIndex: 1,
              name: '访问量',
              data: dataArr.map(function(item) {
                return item.value_3
              })
            })

            var data = [bar1, bar2, bar3,line]
            this.data = dataArr

            Object.assign(yAxis1, {
              name: '峰值',
              type: 'value',
              max: parseInt(Math.max.apply(null, data[0].data.map(Number)) / 5) * 5 + 5,
              interval: parseInt(Math.max.apply(null, data[0].data.map(Number)) / 5) + 1
            })
            Object.assign(yAxis2, {
              name: '访问量',
              type: 'value',
              max: parseInt(Math.max.apply(null, data[3].data.map(Number)) / 5) * 5 + 5,
              interval: parseInt(Math.max.apply(null, data[3].data.map(Number)) / 5) + 1
            })
            Object.assign(xAxis, {
              data: coms
            })
            Object.assign(tooltip, {
              trigger: 'axis'
            })

            var option = {
              color: colorList,
              grid: {
                x: 30,
                x2: 30,
                y: 50,
                y2: 60
              },
              dataZoom,
              tooltip,
              legend,
              yAxis: [yAxis1, yAxis2],
              xAxis,
              series: data.map(function(item) {
                return item
              })
            }

            // 使用刚指定的配置项和数据显示图表。
            this.myChart.setOption(option, true)
          } else {
            this.myChart.setOption(this.$charts_setting.errOption(res.returnmsg), true)
          }
          this.myChart.resize()
        })
      },
      downExcel() {
        let data = {
          name: '软件峰值及访问量详情',
          data: [['序号', '软件', '授权总数（个）', '最大并发峰值', '平均并发峰值', '访问量（人）']]
        }
        this.data.map((item, key) => {
          data.data.push([key + 1, item.name, item.value_4, item.value, item.value_2, item.value_3])
        })
        this.$current.exportExcel(data.name, data)
      }
    }
  }
</script>

<style scoped>

</style>
