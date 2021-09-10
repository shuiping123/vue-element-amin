<template>
  <el-row>
    <!--软件来源国及厂商访问量排行-->
    <el-col :xs="24" :sm="24" :md="10" :lg="10">
      <div class="cardBoxItem">
        <el-card shadow="hover">
          <card-box style="height: 400px;">
            <div class="cardBoxTitle">
              <span>软件来源国及厂商访问量排行</span>
              <down-excel-tool @downExcel="downExcel"/>
            </div>
            <div class="cardBoxContent" ref="chart"/>
          </card-box>
        </el-card>
      </div>
    </el-col>
    <!--软件授权占用时长排行-->
    <el-col :xs="24" :sm="24" :md="14" :lg="14">
      <div class="cardBoxItem">
        <el-card shadow="hover">
          <card-box style="height: 400px;">
            <div class="cardBoxTitle">
              <span>软件授权占用时长排行</span>
              <down-excel-tool @downExcel="downExcel2"/>
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
    name: 'topsRowDiv',
    data(){
      return {
        myChart1:null,
        myChart2:null,
        // 导出excel
        data1:{},
        data2:{},
      }
    },
    mounted() {
      this.init();
    },
    methods:{
      init() {
        let dom1=this.$refs.chart;
        let dom2=this.$refs.chart2;
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
            this.myChart1.resize();
          })
        }).observe(dom1)
        new ResizeObserverPolyfill(entries => {
          // 注意，entres是个数组，数组项为每个需要监听的DOM节点
          entries.forEach(entry => {
            this.myChart2.resize();
          })
        }).observe(dom2)
      },
      renderChart(searchInfo) {
        this.myChart1.showLoading(_.cloneDeep(this.$charts_setting.loadingOption),true);
        this.myChart2.showLoading(_.cloneDeep(this.$charts_setting.loadingOption),true);
        request({
          url: '/Ashx/ISystemOverview.ashx',
          params: {
            ty: 'GetComView_VisitDuration',
            StartDate: searchInfo.StartDate,
            EndDate: searchInfo.EndDate,
            ComId: searchInfo.ComId.join(','),
            DepId: searchInfo.DepId.join(','),
            ComFamId: searchInfo.ComFamId.join(','),
            BaokouAllChildComId: searchInfo.BaokouAllChildComId,
            Is_Need_Count: searchInfo.Is_Need_Count
          }
        }).then(res => {
          this.myChart1.hideLoading();
          this.myChart2.hideLoading();
          if (res.returncode == 0) {
            this.renderChart1(res)
            this.renderChart2(res)
          }  else {
            this.myChart1.setOption(this.$charts_setting.errOption(res.returnmsg),true)
            this.myChart2.setOption(this.$charts_setting.errOption(res.returnmsg),true)
          }
        })

      },
      renderChart1(res){
        let tooltip = _.cloneDeep(this.$charts_setting.tooltipOption)
        let legend = _.cloneDeep(this.$charts_setting.legendOption)
        let label = _.cloneDeep(this.$charts_setting.labelOption)
        let colorList = _.cloneDeep(this.$charts_setting.colorList)
        let xAxis = _.cloneDeep(this.$charts_setting.xAxisOption)
        let yAxis = _.cloneDeep(this.$charts_setting.yAxisOption)
        let dataZoom = _.cloneDeep(this.$charts_setting.dataZoomOption)
        let barOption = _.cloneDeep(this.$charts_setting.barOption)


        var dataArr = res.returndata
        var yAxisData = dataArr.map(function (item) {
          return item.name;
        });

        var sumData = [];
        var nowData = [];
        dataArr.map(function (item, index) {
          sumData.push(item.value);
          item.children.map(function (itemForChild) {
            nowData.push(itemForChild);
          })
        });
        // 现在nowdate是全部的厂商列表
        nowData = nowData.map(function (item, index) {
          var arr = [];
          dataArr.map(function (itemForCountry, indexForCountry) {
            // console.log('是否包含:'+itemForCountry.children.indexOf(item));
            if (itemForCountry.children.indexOf(item) != -1) {
              arr.push(item.value);
            } else {
              arr.push(0);
            }
          });
          item = {
            name: item.name,
            data: arr
          }
          return item;
        })

        var legendData = ['总访问量'];
        nowData.map(function (item) {
          legendData.push(item.name);
        });


        var seriesData = [];
        let gBar={
          name: '总访问量',
          data: sumData
        }
        Object.assign(gBar,barOption)
        seriesData.push(gBar);
        nowData.map(function (item) {
          Object.assign(item,barOption);
          item.stack = '授权用时';
          item.barMaxWidth = 15;
          item.label = {
            show: false,
            position: 'insideRight'
          };
          seriesData.push(item);
        });

        Object.assign(tooltip,{
          trigger: 'axis',
          formatter: function (params) {
            var str = params[0].axisValue + ' - 访问量详情<br/>';
            var sum = 0;
            params.map(function (item, index) {
              if (item.value !== 0) {
                str += item.marker + item.seriesName + '：' + item.value + '人<br/>';
              }
              sum += item.value
            })
            // str += "总访问量：" + sum + '人'
            return str;
          }
        })
        Object.assign(legend,{
          data: legendData,
        })
        Object.assign(xAxis,{
          type:'value'
        })
        Object.assign(yAxis,{
          type: 'category',
          data: yAxisData,
          inverse: true,
        })

        // 导出excel的数据
        this.data1={
          yAxisData:yAxisData,
          seriesData:seriesData
        };
        if (yAxisData.length===0){
          this.myChart1.setOption(this.$charts_setting.noDataOption,true)
          return false;
        }

        let option = {
          tooltip,
          legend,
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: 40,
            containLabel: true
          },
          xAxis,
          color: colorList,
          yAxis,
          series: seriesData
        };
        this.myChart1.setOption(option, true)
      },
      renderChart2(res){
        let tooltip = _.cloneDeep(this.$charts_setting.tooltipOption)
        let legend = _.cloneDeep(this.$charts_setting.legendOption)
        let label = _.cloneDeep(this.$charts_setting.labelOption)
        let colorList = _.cloneDeep(this.$charts_setting.colorList)
        let xAxis = _.cloneDeep(this.$charts_setting.xAxisOption)
        let yAxis = _.cloneDeep(this.$charts_setting.yAxisOption)
        let dataZoom = _.cloneDeep(this.$charts_setting.dataZoomOption)
        let barOption = _.cloneDeep(this.$charts_setting.barOption)

        var dataArr = res.outdata1;
        this.data2=dataArr;
        var coms = dataArr.map(function (item) {
          return item.name
        });
        var data = [
          {
            name: '日均授权占用时长', data: dataArr.map(function (item) {
              return item.value
            })
          },
        ];
        Object.assign(yAxis,{
          name: '时长',
          type: 'value',
        })
        Object.assign(xAxis,{
          type: 'category',
          data: coms
        })
        Object.assign(tooltip,{
          trigger:'axis'
        })

        if (coms.length===0){
            this.myChart2.setOption(this.$charts_setting.noDataOption,true)
            return false;
        }
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
        this.myChart2.setOption(option, true)
      },
      downExcel(){
        let data={
          name:'软件来源国及厂商访问量排行',
          data:[['国家名称','厂商名称','访问量（人）']]
        }
        this.data1.yAxisData.map((item,key)=>{
          this.data1.seriesData.map((item2)=>{
            data.data.push([item,item2.name,item2.data[key]])
          })
        })
        this.$current.exportExcel(data.name,data)
      },
      downExcel2(){
        let data={
          name:'软件授权占用时长排行',
          data:[['序号','软件名称','日均授权占用时长（时）']]
        }
        this.data2.map((item,key)=>{
          data.data.push([key+1,item.name,item.value]);
        })
        this.$current.exportExcel(data.name,data)
      }
    }
  }
</script>

<style scoped>

</style>
