<template>
  <el-row>
    <!--软件峰值排行榜-->
    <el-col :xs="24" :sm="24" :md="24" :lg="24">
      <div class="cardBoxItem">
        <el-card shadow="hover">
          <card-box style="height: 400px;">
            <div class="cardBoxTitle">
              <span>软件峰值排行榜</span>
              <down-excel-tool @downExcel="downExcel"/>
            </div>
            <div class="cardBoxContent" ref="chart"/>
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
    data(){
      return {
        myChart:null,
        excelData:[]
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
            ty: 'GetComView_SoftBFTokenRanking',
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
            this.renderChartOption(res)
          }  else {
            this.myChart.setOption(this.$charts_setting.errOption(res.returnmsg),true)
          }
        })

      },
      renderChartOption(res){
        let tooltip = _.cloneDeep(this.$charts_setting.tooltipOption)
        let legend = _.cloneDeep(this.$charts_setting.legendOption)
        let label = _.cloneDeep(this.$charts_setting.labelOption)
        let colorList = _.cloneDeep(this.$charts_setting.colorList)
        let xAxis = _.cloneDeep(this.$charts_setting.xAxisOption)
        let yAxis = _.cloneDeep(this.$charts_setting.yAxisOption)
        let dataZoom = _.cloneDeep(this.$charts_setting.dataZoomOption)
        let barOption = _.cloneDeep(this.$charts_setting.barOption)

        var dataArr = res.returndata;
        this.excelData=dataArr;
        var coms = dataArr.map(function (item) {
          return item.name;
        });
        var data = [
          {
            name: '最大并发峰值', data: dataArr.map(function (item) {
              return item.value
            })
          },
          {
            name: '平均并发峰值', data: dataArr.map(function (item) {
              return item.value_2
            })
          },
        ];
        if (coms.length===0){
          this.myChart.setOption(this.$charts_setting.noDataOption, true)
          return false;
        }
        Object.assign(tooltip,{
          trigger: 'axis',
        })
        Object.assign(yAxis,{
          name: '峰值',
          type: 'value',
        })
        Object.assign(xAxis,{
          type: 'category',
          data: coms
        })
        var option = {
          color: colorList,
          grid: {
            x: 50,
            x2: 30,
            y: 50,
            y2: 60
          },
          dataZoom,
          tooltip,
          legend,
          yAxis,
          xAxis,
          series: data.map(function (item) {
            Object.assign(item,barOption)
            return item
          })
        };

        this.myChart.setOption(option, true)
      },
      downExcel(){
        let data={
          name:'软件峰值排行榜',
          data:[['序号','软件名称','最大并发峰值','平均并发峰值']]
        }

        this.excelData.map((item,key)=>{
            data.data.push([key+1,item.name,item.value,item.value_2])
        })
        this.$current.exportExcel(data.name,data)
      },
    }
  }
</script>

<style scoped>

</style>
