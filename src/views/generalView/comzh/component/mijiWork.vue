<template>
  <el-row>
    <!--密集工作-->
    <el-col :xs="24" :sm="24" :md="8" :lg="8">
      <div class="cardBoxItem">
        <el-card shadow="hover">
          <card-box style="height: 350px;">
            <div class="cardBoxTitle">
              <span>授权密集占用天数</span>
              <!--<down-excel-tool @downExcel="downExcel"/>-->
            </div>
            <div class="cardBoxContent" ref="chart"/>
          </card-box>
        </el-card>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="16" :lg="16">
      <div class="cardBoxItem">
        <el-card shadow="hover">
          <card-box style="height: 350px;">
            <div class="cardBoxTitle">
              <span>授权密集占用趋势</span>
              <down-excel-tool @downExcel="downExcel"/>
            </div>
            <div class="cardBoxContent" ref="chart2"/>
          </card-box>
        </el-card>
      </div>
    </el-col>

  </el-row>
</template>

<script>
  import { request } from '../../../../network'
  import ResizeObserverPolyfill from 'resize-observer-polyfill';
  export default {
    name: 'peakValueTop',
    data() {
      return {
        myChart1: null,
        myChart2: null,
        excelData1: [],
        excelData2: []
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        let dom1 = this.$refs.chart
        let dom2 = this.$refs.chart2
        // 创建echarts对象
        if (!this.myChart1) this.myChart1 = this.$echarts.init(dom1)
        if (!this.myChart2) this.myChart2 = this.$echarts.init(dom2)
        // 渲染echarts图表 - 暂无数据的提示
        this.myChart1.setOption(this.$charts_setting.noDataOption, true)
        this.myChart2.setOption(this.$charts_setting.noDataOption, true)
        // 绑定resize函数
        new ResizeObserverPolyfill(entries => {
          // 注意，entres是个数组，数组项为每个需要监听的DOM节点
          entries.forEach(entry => {
            this.myChart1.resize()
          })
        }).observe(dom1)
        new ResizeObserverPolyfill(entries => {
          // 注意，entres是个数组，数组项为每个需要监听的DOM节点
          entries.forEach(entry => {
            this.myChart2.resize()
          })
        }).observe(dom2)

      },
      renderChart(searchInfo) {
        this.myChart1.showLoading(_.cloneDeep(this.$charts_setting.loadingOption), true)
        this.myChart2.showLoading(_.cloneDeep(this.$charts_setting.loadingOption), true)
        request({
          url: '/Ashx/ISystemOverview.ashx',
          params: {
            ty: 'GetComView_MiDays_Qs',
            StartDate: searchInfo.StartDate,
            EndDate: searchInfo.EndDate,
            ComId: searchInfo.ComId.join(','),
            DepId: searchInfo.DepId.join(','),
            ComFamId: searchInfo.ComFamId.join(','),
            BaokouAllChildComId: searchInfo.BaokouAllChildComId,
            Is_Need_Count: searchInfo.Is_Need_Count
          }
        }).then(res => {
          this.myChart1.hideLoading()
          this.myChart2.hideLoading()
          if (res.returncode == 0) {
            this.renderChartOption1(res)
            this.renderChartOption2(res)
          } else {
            this.myChart1.setOption(this.$charts_setting.errOption(res.returnmsg), true)
            this.myChart2.setOption(this.$charts_setting.errOption(res.returnmsg), true)
          }
        })

      },
      renderChartOption1(res) {
        let tooltip = _.cloneDeep(this.$charts_setting.tooltipOption)
        let colorList = _.cloneDeep(this.$charts_setting.colorList)
        let title = _.cloneDeep(this.$charts_setting.dashboardOption.title)

        var dataVal = res.returndata[1].value
        var titleContent = '授权密集占用天数'
        var name = '授权密集占用天数'
        var max = res.returndata[0].value
        var colorSet = {
          color: colorList[0]
        }

        Object.assign(tooltip, {
          formatter: function(param) {
            return param.name + ':' + dataArr
          }
        })
        Object.assign(title, {
          text: titleContent
        })
        let series=_.cloneDeep(this.$charts_setting.dashboardOption.seriesOption(name,titleContent,dataVal,max))

        var option = {
          tooltip,
          title,
          series
        }
        this.myChart1.setOption(option, true)
      },
      renderChartOption2(res) {
        let tooltip = _.cloneDeep(this.$charts_setting.tooltipOption)
        let legend = _.cloneDeep(this.$charts_setting.legendOption)
        let colorList = _.cloneDeep(this.$charts_setting.colorList)
        let xAxis = _.cloneDeep(this.$charts_setting.xAxisOption)
        let yAxis = _.cloneDeep(this.$charts_setting.yAxisOption)
        let dataZoom = _.cloneDeep(this.$charts_setting.dataZoomOption)

        var UsrNum = res.outdata1.series[0].data;
        // var LastYear = response.returndata.series[1].data;//去年同比
        var AvgNum = res.outdata2;//平均数
        var CurTime = res.outdata1.xAxis;//x轴时间
        this.excelData2={UsrNum,AvgNum,CurTime}
        Object.assign(xAxis,{
          type: 'category',
          boundaryGap: false,
          data: CurTime
        })
        Object.assign(yAxis,{
          name: '时长(时)',
          type: 'value'
        })
        Object.assign(tooltip,{trigger: 'axis'})
        if (xAxis.data.length===0){
          this.myChart2.setOption(this.$charts_setting.noDataOption, true)
          return false;
        }
        var option = {
          xAxis,
          color: colorList,
          yAxis,
          legend,
          grid: {
            x: 60,
            x2: 60,
            y: 50,
            y2: 65
          },
          tooltip,
          visualMap: {
            show: false,
            // 这里分别控制使用数超过【当前阀值】的块颜色和未超过的块颜色
            pieces: [{
              gt: -1,
              lte: AvgNum,
              color: colorList[0]
            }, {
              gt: AvgNum,
              color: colorList[1]
            }],
            seriesIndex: 0
          },
          dataZoom,
          series: [
            //使用数
            {
              name: "授权占用时长（时）",
              data: UsrNum,
              type: 'line',
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'}
                ]
              },
              markLine: {
                silent: true,
                label: {
                  formatter: function (param) {
                    return '平均授权\n占用时长\n' + param.value + '时'
                  }
                },
                data: [{
                  yAxis: AvgNum
                }]
              },
              smooth: true,
              areaStyle: {}
            },
          ]
        };

        this.myChart2.setOption(option, true)
      },
      downExcel() {
        let data = {
          name: '授权密集占用趋势',
          data: [['序号', '日期', '授权占用时长(时)', '平均授权占用时长(时)', '是否密集']]
        }
        this.excelData2.CurTime.map((item, key) => {
          data.data.push([key + 1, item, this.excelData2.UsrNum[key], this.excelData2.AvgNum,this.excelData2.UsrNum[key]>=this.excelData2.AvgNum?'是':'否'])
        })
        this.$current.exportExcel(data.name, data)
      }
    }
  }
</script>

<style scoped>

</style>
