<template>
    <el-col :xs="xs" :sm="sm" :md="md" :lg="lg">
        <div class="cardBoxItem">
            <el-card shadow="hover">
                <card-box :style="{height:height}">
                    <div class="cardBoxTitle">
                        <span>{{title_content}}</span>
                        <down-excel-tool @click="downExcel"/>
                        <fullscroll-tool :isfull.sync="isfull"/>
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
    name: '',
    props: {
      xs: { type: Number, default: 24 },
      sm: { type: Number, default: 24 },
      md: { type: Number, default: 24 },
      lg: { type: Number, default: 24 },
      height: { type: String, default: '350px' },
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
        colorList: _.cloneDeep(this.$charts_setting.colorList),//颜色序列
        tooltip: _.cloneDeep(this.$charts_setting.tooltipOption),//提示框样式
        legend: _.cloneDeep(this.$charts_setting.legendOption),//图例样式
        label: _.cloneDeep(this.$charts_setting.labelOption),//标示线样式
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
        let option = {}
        this.myChart.setOption(option, true)
        this.myChart.resize()
      },
      /**导出excel*/
      downExcel() {
        let data = {
          name: this.title_content,
          data: [['序号', '单位名称']]
        }
        //做数据处理

        //最后导出
        let func = this.$current.exportExcel
        func(data.name, data)
      }
    }
  }
</script>

<style scoped>

</style>
