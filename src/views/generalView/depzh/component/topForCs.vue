<template>
    <el-col :xs="xs" :sm="sm" :md="md" :lg="lg">
        <div class="cardBoxItem">
            <el-card shadow="hover">
                <card-box :style="{height:height+'px'}" :isfull="isfull">
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
    name: 'topForCs',
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
          yAxis = _.cloneDeep(this.$charts_setting.yAxisOption),
          dataZoom = _.cloneDeep(this.$charts_setting.dataZoomRightOption)

        if(this.data.length===0){
          this.myChart.setOption(this.$charts_setting.noDataOption, true)
          return false;
        }

        let data=this.data;
        var countrys = data.map(function (item) {
          return item.name
        });
        var data1 = data.map(function (item) {
          return item.value
        });
        var data2 = data.map(function (item) {
          return item.value_2
        });

        Object.assign(tooltip,{trigger: 'axis'})
        yAxis=this.$current.deepMerge(yAxis,{
          type: 'category',
          data: countrys,
          inverse: true,
          axisTick: {show: false},
          axisLine: {show: false},
          axisLabel: {
            formatter: function (item) {
              return item.length > 11 ? (item.substr(0, 11) + '...') : item
            }
          },
          splitLine: {
            show: false
          }
        })
        barOption1=this.$current.deepMerge(barOption1,{
          name: '访问量',
          label: {
            show: true,
            padding: [2, 0, 0, 0],
            position: 'right',
            formatter: function (params) {
              return params.value + '人'
            }
          },
          data: data1
        })
        barOption2=this.$current.deepMerge(barOption2,{
          name: '软件数量',
          label: {
            show: true,
            padding: [2, 0, 0, 0],
            position: 'right',
            formatter: function (params) {
              return params.value + '个'
            }
          },
          data: data2
        })
        var option = {
          tooltip,
          legend,
          dataZoom,
          grid: {
            top: 40,
            left: 20,
            right: '8%',
            bottom: '3%',
            containLabel: true
          },
          color: colorList,
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {show: false},
            splitLine: {
              show: false
            }

          },
          yAxis,
          series: [barOption1,barOption2]
        };


        this.myChart.setOption(option, true)
        this.myChart.resize()
      },
      /**导出excel*/
      downExcel() {
        let data = {
          name: this.title_content,
          data: [['序号', '厂商名称','访问量（人）','软件数量（个）']]
        }
        //做数据处理
        this.data.map((item,key)=>{
          data.data.push([key+1,item.name,item.value,item.value_2]);
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
