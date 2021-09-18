<template>
  <el-col :xs="xs" :sm="sm" :md="md" :lg="lg">
    <div class="cardBoxItem">
      <el-card shadow="hover">
        <card-box :style="{height:height+'px'}">
          <div class="cardBoxTitle">
            <span>{{title_content}}</span>
            <down-excel-tool @downExcel="downExcel"/>
          </div>
          <div class="cardBoxContent" ref="chart"/>
        </card-box>
      </el-card>
    </div>
  </el-col>
</template>
<script>
  import ResizeObserverPolyfill from 'resize-observer-polyfill'

  export default {
    name: 'peakValueInfo',
    props: {
      xs: { type: Number, default: 24 },
      sm: { type: Number, default: 24 },
      md: { type: Number, default: 24 },
      lg: { type: Number, default: 24 },
      height: { type: Number, default: 400 },
      /**标题*/
      title_content: { type: String, default: '标题' },
      /**三种状态: nodata：无数据;loading：加载中;render：需要渲染;err：报错*/
      state: { type: String, default: 'nodata' },
      /**需要渲染的数据：受state影响
       * nodata:可传空;loading:可传空;render:传需要的数据;err:传报错信息,例如"登录超时!"*/
      data: {}
    },
    data() {
      return {
        isfull: false,//是否全屏
        myChart: null//erhart示例
      }
    },
    watch: {
      state() {
        this.handleChange()
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      /**初始化*/
      init() {
        let domDemo = this.$refs.chart
        // 创建echarts对象
        if (!this.myChart) this.myChart = this.$echarts.init(domDemo)
        // 渲染echarts图表 - 暂无数据的提示
        this.myChart.setOption(this.$charts_setting.noDataOption, true)
        // 绑定resize函数
        new ResizeObserverPolyfill(entries => {
          // 注意，entres是个数组，数组项为每个需要监听的DOM节点
          entries.forEach(entry => {
            this.myChart.resize()
          })
        }).observe(domDemo)
      },
      /**做state变化的操作处理*/
      handleChange() {
        this.myChart.hideLoading()
        if (this.state === 'noData') {
          this.myChart.setOption(this.$charts_setting.noDataOption, true)
        } else if (this.state === 'loading') {
          this.myChart.showLoading(this.$charts_setting.loadingOption)
        } else if (this.state === 'render') {
          this.renderChart()
        } else {
          let func = this.$charts_setting.errOption
          this.myChart.setOption(func(this.data), true)
        }
      },
      /**渲染图表*/
      renderChart() {
        let colorList = _.cloneDeep(this.$charts_setting.colorList),
          legend = _.cloneDeep(this.$charts_setting.legendOption),
          tooltip = _.cloneDeep(this.$charts_setting.tooltipOption),
          label = _.cloneDeep(this.$charts_setting.labelOption),
          barOption1 = _.cloneDeep(this.$charts_setting.barOption),
          barOption2 = _.cloneDeep(this.$charts_setting.barOption),
          line = _.cloneDeep(this.$charts_setting.lineOption),
          xAxis = _.cloneDeep(this.$charts_setting.xAxisOption),
          yAxis = _.cloneDeep(this.$charts_setting.yAxisOption)

        let res = this.data
        var axisData = res.xAxis
        var data1 = res.maxData
        var data2 = res.avgData
        if(axisData.length===0){
          this.myChart.setOption(this.$charts_setting.noDataOption, true)
          return false;
        }

        var arr = []
        arr.push(Math.max.apply(null, data1.map(Number)))
        arr.push(Math.max.apply(null, data2.map(Number)))

        Object.assign(tooltip, { trigger: 'axis' })
        Object.assign(xAxis, { type: 'category', data: axisData })
        Object.assign(yAxis, {
          type: 'value',
          name: '峰值',
          min: 0,
          max: parseInt(Math.max.apply(null, arr.map(Number)) / 5) * 5 + 5,
          interval: parseInt(Math.max.apply(null, arr.map(Number)) / 5) + 1,
        })
        Object.assign(barOption1,{ name: '最大峰值', data: data1 })
        Object.assign(barOption2,{name: '平均峰值', data: data2})
        var option = {
          color: colorList,
          tooltip,
          grid: {
            x: 50,
            x2: 10,
            y: 50,
            y2: 30
          },
          legend,
          xAxis,
          yAxis,
          series: [barOption1,barOption2]
        }
        this.myChart.setOption(option, true)
      },
      /**导出excel*/
      downExcel() {
        let data = {
          name: this.title_content,
          data: [['序号', '软件名称', '最大峰值', '平均峰值']]
        }
        //做数据处理
        this.data.xAxis.map((item,key)=>{
          data.data.push([key+1,item,this.data.maxData[key],this.data.avgData[key]]);
        })
        //最后导出
        let func = this.$current.exportExcel
        func(data.name, data)
      }
    }
  }
</script>

<style scoped>

</style>
