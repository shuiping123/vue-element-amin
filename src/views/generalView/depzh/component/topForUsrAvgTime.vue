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
    name: 'topForUsrAvgTime',
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
        myChart: null,//erhart示例
        excelData:{},//导出excel的数据
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
          barOption = _.cloneDeep(this.$charts_setting.barOption),
          line = _.cloneDeep(this.$charts_setting.lineOption),
          xAxis = _.cloneDeep(this.$charts_setting.xAxisOption),
          yAxis = _.cloneDeep(this.$charts_setting.yAxisOption),
          dataZoom = _.cloneDeep(this.$charts_setting.dataZoomRightOption)

        var dataArr = this.data
        if(this.data.length===0){
          this.myChart.setOption(this.$charts_setting.noDataOption, true)
          return false;
        }
        var yAxisData = dataArr.map(function(item) {
          return item.name
        })


        var onlineData = []
        var nowData = []
        dataArr.map(function(item, index) {
          onlineData.push(item.value)
          item.children.map(function(itemForChild) {
            nowData.push(itemForChild)
          })
        })
        // 现在nowdate是全部的厂商列表
        nowData = nowData.map(function(item, index) {
          var arr = []
          dataArr.map(function(itemForCountry, indexForCountry) {
            // console.log('是否包含:'+itemForCountry.children.indexOf(item));
            if (itemForCountry.children.indexOf(item) != -1) {
              arr.push(item.value)
            } else {
              arr.push(0)
            }
          })
          item = {
            name: item.name,
            data: arr
          }
          return item
        })

        var legendData = []
        nowData.map(function(item) {
          legendData.push(item.name)
        })

        this.excelData={
            legendData:_.cloneDeep(legendData),
            dataArr
        }



        legendData.push('用户在勤天数')

        var seriesData = []

        nowData.map(function(item) {
          Object.assign(item,barOption)
          item.stack = '授权用时'
          item.xAxisIndex = 0
          seriesData.push(item)
        })



        Object.assign(barOption,{
          name: '用户在勤天数',
          itemStyle: {
            color: colorList[0]
          },
          xAxisIndex: 1,
          data: onlineData
        })
        seriesData.push(barOption)

        Object.assign(tooltip, {
          trigger: 'axis',
          position: ['80%', 40],
          formatter: function(params) {
            var str = params[0].axisValue + ' - 日均授权占用时长及在勤天数<br/>'
            var sum = 0
            params.map(function(item, index) {
              if (item.value !== 0) {
                str += item.marker + item.seriesName + '：' + item.value + '<br/>'
              }
              sum += item.value
            })
            return str
          }
        })
        Object.assign(legend,{data: legendData});
        yAxis=this.$current.deepMerge(yAxis,{
          type: 'category',
          data: yAxisData,
          inverse: true,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            formatter: function(item) {
              return item.length > 11 ? (item.substr(0, 11) + '...') : item
            }
          },
          splitLine: {
            show: false
          }
        });


        var option = {
          tooltip,
          dataZoom,
          legend,
          grid: {
            left: 20,
            right: '4%',
            bottom: '3%',
            top: 40,
            containLabel: true
          },
          xAxis: [{
            type: 'value',
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: { show: false },
            splitLine: { show: false }
          }, {
            type: 'value',
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: { show: false },
            splitLine: { show: false }
          }],
          color: colorList,
          yAxis,
          series: seriesData
        }
        this.myChart.setOption(option, true)
        this.myChart.resize()
      },
      /**导出excel*/
      downExcel() {
        let data = {
          name: this.title_content,
          data: [['序号', '用户名称','在勤天数']]
        }
        //做数据处理
        this.$current.unique(this.excelData.legendData).map(item=>{
          data.data[0].push(item);
        })

        this.excelData.dataArr.map((item,key)=>{
          let arr=[key+1,item.name,item.value];
          item.children.map(item_child=>{arr.push(item_child.value)});
          data.data.push(arr);
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
