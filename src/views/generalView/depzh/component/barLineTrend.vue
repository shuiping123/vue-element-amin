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
    name: 'barLineThend',
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
        colorList: _.cloneDeep(this.$charts_setting.colorList),//颜色序列
        tooltip: _.cloneDeep(this.$charts_setting.tooltipOption),//提示框样式
        legend: _.cloneDeep(this.$charts_setting.legendOption),//图例样式
        label: _.cloneDeep(this.$charts_setting.labelOption),//标示线样式
        barOption: _.cloneDeep(this.$charts_setting.barOption),//柱形图样式
        lineOption: _.cloneDeep(this.$charts_setting.lineOption),//折线图样式
        xAxis: _.cloneDeep(this.$charts_setting.xAxisOption),//x轴样式
        yAxis: _.cloneDeep(this.$charts_setting.yAxisOption),//y轴样式
        myChart: null,//erhart示例
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
        let colorList=_.cloneDeep(this.$charts_setting.colorList),
          legend=_.cloneDeep(this.$charts_setting.legendOption),
          tooltip=_.cloneDeep(this.$charts_setting.tooltipOption),
          barOption=_.cloneDeep(this.$charts_setting.barOption),
          line1=_.cloneDeep(this.$charts_setting.lineOption),
          line2=_.cloneDeep(this.$charts_setting.lineOption),
          xAxis=_.cloneDeep(this.$charts_setting.xAxisOption),
          y1=_.cloneDeep(this.$charts_setting.yAxisOption),
          y2=_.cloneDeep(this.$charts_setting.yAxisOption),
          y3=_.cloneDeep(this.$charts_setting.yAxisOption);


        let res=this.data;

        var axisData = res.xAxis;

        var data2 = res.TokenHourData;
        var data3 = res.WorkHourData;
        var data4 = res.FwlData;
        var data5 = res.PcData;
        var arr = [];
        // arr.push(Math.max.apply(null, data1.map(Number)));
        arr.push(Math.max.apply(null, data2.map(Number)));
        arr.push(Math.max.apply(null, data3.map(Number)));

        var colors = colorList;
        Object.assign(tooltip,{trigger: 'axis'});
        Object.assign(xAxis,{
          type: 'category',
          data: axisData,
          axisLabel: {
            formatter: function (params) {
              return params.split(' ').length == 1?params:params.split(' ')[0] + '\n' + params.split(' ')[1]
            }
          }
        })
        Object.assign(y1,{
          type: 'value',
          name: '访问量',
          min: 0,
          position: 'left',
          max: parseInt(Math.max.apply(null, data4.map(Number)) / 5) * 5 + 5,
          interval: parseInt(Math.max.apply(null, data4.map(Number)) / 5) + 1,
          axisLine: {lineStyle: {color:colors[0]}},
          axisLabel: {
            formatter: '{value} 人'
          }
        })
        Object.assign(y2,{
          type: 'value',
          name: '时间',
          min: 0,
          max: parseInt(Math.max.apply(null, arr.map(Number)) / 5) * 5 + 5,
          interval: parseInt(Math.max.apply(null, arr.map(Number)) / 5) + 1,
          position: 'right',
          axisLine: {lineStyle: {color:colors[1]}},
          axisLabel: {formatter: '{value} 时'}
        })
        Object.assign(y3,{
          type: 'value',
          name: '访问次数',
          max: parseInt(Math.max.apply(null, data5.map(Number)) / 5) * 5 + 5,
          interval: parseInt(Math.max.apply(null, data5.map(Number)) / 5) + 1,
          min: 0,
          offset: 80,
          position: 'right',
          axisLine: {lineStyle: {color: colors[2]}},
          axisLabel: {formatter: '{value} 次'}
        })
        Object.assign(barOption,{
          name: '访问量',
          type: 'bar',
          yAxisIndex: 0,
          data: data4
        })
        Object.assign(line1,{
          name: '授权占用时长',
          type: 'line',
          yAxisIndex: 1,
          data: data2
        })
        Object.assign(line2,{
          name: '访问次数',
          type: 'line',
          yAxisIndex: 2,
          data: data5
        })
        var option = {
          color: colors,
          tooltip,
          grid: {
            x: 50,
            x2: '20%',
            y: 50,
            y2: 20,
          },
          legend,
          xAxis,
          yAxis: [y1, y2, y3],
          series: [barOption, line1, line2]
        };

        this.myChart.setOption(option, true)
        this.myChart.resize()
      },
      /**导出excel*/
      downExcel() {
        let data = {
          name: this.title_content,
          data: [['序号', '日期', '访问量（人）', '授权占用时长（时）', '访问次数（次）']]
        }
        //做数据处理
        this.data.xAxis.map((item,key)=>{
          data.data.push([key+1,item,this.data.FwlData[key],this.data.TokenHourData[key],this.data.PcData[key]])
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
