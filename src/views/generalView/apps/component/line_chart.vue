<template>
    <div style="width:100%;height:100%"></div>
</template>

<script>
  import { request } from '../../../../network'

  export default {
    name: 'line_chart',
    data(){
      return {
        myChart:null
      }
    },
    mounted() {
      this.init();
    },
    methods:{
      init(){
        // 创建echarts对象
        if (!this.myChart)this.myChart=this.$echarts.init(this.$el);
        // 实例化对象 - 渲染
        this.myChart.setOption(_.cloneDeep(this.$charts_setting.noDataOption),true);
        // 绑定resize事件
        new ResizeObserver(entries => {
          // 注意，entres是个数组，数组项为每个需要监听的DOM节点
          entries.forEach(entry => {
            this.myChart.resize();
          })
        })
          .observe(this.$el)
      },
      renderChart(searchInfo){
        this.myChart.showLoading(_.cloneDeep(this.$charts_setting.loadingOption),true);
        request({
          url: '/Ashx/ISystemOverview.ashx',
          params: {
            ty: 'GetSoftView_FwAndToken',
            StartDate: searchInfo.StartDate,
            EndDate: searchInfo.EndDate,
            ComId: searchInfo.ComId.join(','),
            ComFamId: searchInfo.ComFamId.join(','),
            BaokouAllChildComId: searchInfo.BaokouAllChildComId,
            Is_Need_Count: searchInfo.Is_Need_Count
          }
        }).then(res => {
          this.myChart.hideLoading();
          if (res.returncode == 0) {
            let tooltip=_.cloneDeep(this.$charts_setting.tooltipOption);
            let legend=_.cloneDeep(this.$charts_setting.legendOption);
            let label=_.cloneDeep(this.$charts_setting.labelOption);
            let xAxis=_.cloneDeep(this.$charts_setting.xAxisOption);
            let yAxis1=_.cloneDeep(this.$charts_setting.yAxisOption);
            let yAxis2=_.cloneDeep(this.$charts_setting.yAxisOption);
            let toolbox=_.cloneDeep(this.$charts_setting.toolboxOption);
            // legend.data=['授权并发数(个)', '来访用户数(人)', '日人均授权用时(时)']
            tooltip.trigger='axis';

            let xAxisArr;
            let yAxisMax = Math.max.apply(null, res.returndata.series[0].data.map(Number)) > Math.max.apply(null, res.returndata.series[1].data.map(Number)) ? Math.max.apply(null, res.returndata.series[0].data.map(Number)) : Math.max.apply(null, res.returndata.series[1].data.map(Number))
            if (res.returndata.xAxis.length != 0 && res.returndata.xAxis != null) {
              // 如果时间含有“时”，把前面的时间去掉，只留下小时===昨天，今天
              if (res.returndata.xAxis[0].split(' ')[0] === res.returndata.xAxis[1].split(' ')[0]) {
                var arr = [];
                $.each(res.returndata.xAxis, function (index) {
                  arr.push(res.returndata.xAxis[index].replace(new RegExp(res.returndata.xAxis[0].split(' ')[0] + ' ', 'g'), '') + "时");
                });
                xAxisArr = arr;
                // 如果不含有时
              } else {
                xAxisArr = res.returndata.xAxis;
              }
            }

            Object.assign(xAxis,{
              type: 'category',
              data: xAxisArr,//方法1,
            })
            Object.assign(yAxis1,{
              type: 'value',
              name: '并发/访问量',
              min: 0,
              max: parseInt(yAxisMax / 5) * 5 + 5,
              interval: parseInt(yAxisMax / 5) + 1,
            })
            Object.assign(yAxis2,{
              type: 'value',
              name: '日人均用时',
              min: 0,
              max: parseInt(Math.max.apply(null, res.returndata.series[2].data.map(Number)) / 5) * 5 + 5,
              interval: parseInt(Math.max.apply(null, res.returndata.series[2].data.map(Number)) / 5) + 1,
            })
            let option = {
              color: this.$charts_setting.colorList,
              tooltip,
              legend:legend,
              grid: {
                x: 30,
                x2: 30,
                y: 60,
                y2: 30
              },
              xAxis,
              toolbox,
              yAxis: [yAxis1,yAxis2],
              series: [
                {
                  name: '日人均授权用时(时)',
                  type: 'bar',
                  barMaxWidth: 30,
                  yAxisIndex: 1,
                  itemStyle:_.cloneDeep(this.$charts_setting.barOption),
                  // symbolSize: 1,
                  smooth: true,
                  animation: true,
                  data: res.returndata.series[2].data
                },
                {
                  name: '授权并发数(个)',
                  type: 'line',
                  lineStyle:_.cloneDeep(this.$charts_setting.lineOption),
                  yAxisIndex: 0,
                  symbolSize: 1,
                  smooth: true,
                  animation: true,
                  data: res.returndata.series[0].data

                },
                {
                  name: '来访用户数(人)',
                  type: 'line',
                  yAxisIndex: 0,
                  lineStyle:_.cloneDeep(this.$charts_setting.lineOption),
                  symbolSize: 1,
                  smooth: true,
                  animation: true,
                  data: res.returndata.series[1].data
                },

              ]
            };
            // 使用刚指定的配置项和数据显示图表。
            this.myChart.setOption(option,true);
          }else {
            this.myChart.setOption(this.$charts_setting.errOption(res.returnmsg),true)
          }
          this.myChart.resize();
        })
      }
    }
  }
</script>

<style scoped>

</style>
