<template>
  <el-col :xs="24" :sm="24" :md="14" :lg="14">
    <div class="cardBoxItem">
      <el-card shadow="hover">
        <card-box style="height: 400px;">
          <div class="cardBoxTitle">
            <span>辖下一级组织综合软件应用分析</span>
          </div>
          <div class="cardBoxContent" ref="chart"/>
        </card-box>
      </el-card>
    </div>
  </el-col>
</template>

<script>
  import { request } from '../../../../network'
  import 'echarts/extension/dataTool'
  import ResizeObserverPolyfill from 'resize-observer-polyfill';

  export default {
    name: 'hexuDiv',
    data(){
      return {
        myChart:null
      }
    },
    mounted() {
      this.init()
    },
    methods:{
      init() {
        let dom=this.$refs.chart;
        // 创建echarts对象
        if (!this.myChart) this.myChart = this.$echarts.init(dom)
        // 渲染echarts图表 - 暂无数据的提示
        this.myChart.setOption(this.$charts_setting.noDataOption, true)
        // 绑定resize函数
        new ResizeObserverPolyfill(entries => {
          // 注意，entres是个数组，数组项为每个需要监听的DOM节点
          entries.forEach(entry => {
            this.myChart.resize();
          })
        }).observe(dom)
      },
      renderChart(searchInfo) {
        this.myChart.showLoading(_.cloneDeep(this.$charts_setting.loadingOption),true);
        request({
          url: '/Ashx/ISystemOverview.ashx',
          params: {
            ty: 'GetComView_SOSoftUseTimeFb',
            StartDate: searchInfo.StartDate,
            EndDate: searchInfo.EndDate,
            ComId: searchInfo.ComId.join(','),
            DepId: searchInfo.DepId.join(','),
            ComFamId: searchInfo.ComFamId.join(','),
            BaokouAllChildComId: searchInfo.BaokouAllChildComId,
            Is_Need_Count: searchInfo.Is_Need_Count
          }
        }).then(res => {
          this.myChart.hideLoading();
          if (res.returncode == 0) {
            let tooltip = _.cloneDeep(this.$charts_setting.tooltipOption)
            let legend = _.cloneDeep(this.$charts_setting.legendOption)
            let label = _.cloneDeep(this.$charts_setting.labelOption)
            let colorList = _.cloneDeep(this.$charts_setting.colorList)
            let xAxis = _.cloneDeep(this.$charts_setting.xAxisOption)
            let yAxis = _.cloneDeep(this.$charts_setting.yAxisOption)
            let dataZoom = _.cloneDeep(this.$charts_setting.dataZoomOption)


            var xAxisData = res.outdata2;
            let data1 = res.returndata;
            let data2 = res.outdata1;
            var data = [];
            data.push(this.$echarts.dataTool.prepareBoxplotData(data1));
            data.push(this.$echarts.dataTool.prepareBoxplotData(data2));

            if (xAxisData.length===0){
              this.myChart.setOption(this.$charts_setting.noDataOption, true)
              return false;
            }
            Object.assign(xAxis,{
              type: 'category',
              data: xAxisData,
            })
            Object.assign(yAxis,{
              type: 'value',
              name: '时间(时)',
            })
            Object.assign(tooltip,{
              trigger:'axis'
            })

            var option = {
              color: colorList,
              legend,
              tooltip,
              grid: {
                left: 60,
                top: 30,
                right: 0,
                bottom: 60
              },
              xAxis,
              yAxis,
              dataZoom,
              series: [
                {
                  name: '授权占用时长',
                  type: 'boxplot',
                  itemStyle: {
                    color: this.$current.colorRgba(colorList[0], 0.1),
                  },
                  data: data[0].boxData,
                  tooltip: {formatter: formatter}
                }
              ]
            };

            function formatter(param) {
              // console.log(param)
              return [
                param.name + ': ',
                // '最大值: ' + param.data[0],
                // '上四分位数: ' + param.data[1],
                // '中位数: ' + param.data[2],
                // '第一四分位数: ' + param.data[3],
                // '最小值: ' + param.data[4]
                '最大值: ' + param.data[5].toFixed(2),
                '上四分位数: ' + param.data[4].toFixed(2),
                '中位数: ' + param.data[3].toFixed(2),
                '第一四分位数: ' + param.data[2].toFixed(2),
                '最小值: ' + param.data[1].toFixed(2)
              ].join('<br/>');
            }
            this.myChart.setOption(option, true)
          }  else {
            this.myChart.setOption(this.$charts_setting.errOption(res.returnmsg),true)
          }
        })

      },
    }
  }
</script>

<style scoped>

</style>
