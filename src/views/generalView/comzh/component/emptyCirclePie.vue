<template>
  <el-row>
    <!--在勤软件授权占用时长分布-->
    <el-col :xs="24" :sm="24" :md="8" :lg="8">
      <div class="cardBoxItem">
        <el-card shadow="hover">
          <card-box style="height: 400px;">
            <div class="cardBoxTitle">
              <span>在勤软件授权占用时长分布</span>
              <down-excel-tool @downExcel="downExcel"/>
            </div>
            <div class="cardBoxContent" ref="chart"/>
          </card-box>
        </el-card>
      </div>
    </el-col>
    <!--辖下一级组织软件授权占用时长分布-->
    <el-col :xs="24" :sm="24" :md="8" :lg="8">
      <div class="cardBoxItem">
        <el-card shadow="hover">
          <card-box style="height: 400px;">
            <div class="cardBoxTitle">
              <span>辖下一级组织软件授权占用时长分布</span>
              <down-excel-tool @downExcel="downExcel2"/>
            </div>
            <div class="cardBoxContent" ref="chart_bar"/>
          </card-box>
        </el-card>
      </div>
    </el-col>
    <!--在勤软件列表-->
    <online-app-list :data="data" :statetype="statetype" :errinfo="errinfo"/>

  </el-row>

</template>

<script>
  import { request } from '../../../../network'
  import onlineAppList from './onlineAppList'
  import ResizeObserverPolyfill from 'resize-observer-polyfill';

  export default {
    name: 'emptyCirclePie',
    components:{onlineAppList},
    data(){
      return {
        myChart:null,// 在勤软件授权占用时长分布的 - echarts实例
        myChart2:null,// 辖下一级组织软件授权占用时长分布的 - echarts实例
        excelData: [],// 在勤软件授权占用时长分布 - 导出excel
        excelData2: [],// 辖下一级组织软件授权占用时长分布 - 导出excel
        statetype:'default',//在勤列表的状态
        data:[],//在勤列表的数据
        errinfo:''//在勤列表的报错信息
      }
    },
    mounted() {
      this.init();
    },
    methods:{
      init(){
        this.init1()
        this.init2()
      },
      init1(){
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
      init2(){
        let dom=this.$refs.chart_bar;
        // 创建echarts对象
        if (!this.myChart2) this.myChart2 = this.$echarts.init(dom)
        // 渲染echarts图表 - 暂无数据的提示
        this.myChart2.setOption(this.$charts_setting.noDataOption, true)
        // 绑定resize函数
        new ResizeObserverPolyfill(entries => {
          // 注意，entres是个数组，数组项为每个需要监听的DOM节点
          entries.forEach(entry => {
            this.myChart2.resize();
          })
        }).observe(dom)
      },
      renderChart(searchInfo){
        this.myChart.showLoading(_.cloneDeep(this.$charts_setting.loadingOption),true);
        this.myChart2.showLoading(_.cloneDeep(this.$charts_setting.loadingOption),true);
        this.statetype='loading';
        request({
          url: '/Ashx/ISystemOverview.ashx',
          params: {
            ty: 'GetComView_SoftTokenFb',
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
          this.myChart2.hideLoading();
          this.statetype='default';
          if (res.returncode == 0) {
            this.renderChart1(res)
            this.renderChart2(res)

          }  else {
            this.myChart.setOption(this.$charts_setting.errOption(res.returnmsg),true)
            this.myChart2.setOption(this.$charts_setting.errOption(res.returnmsg),true)
            this.statetype='err';
            this.errinfo=res.returnmsg;
          }
        })
      },
      renderChart1(res){
        this.data=res.outdata2
        let tooltip = _.cloneDeep(this.$charts_setting.tooltipOption)
        let legend = _.cloneDeep(this.$charts_setting.legendOption)
        let label = _.cloneDeep(this.$charts_setting.labelOption)
        let colorList = _.cloneDeep(this.$charts_setting.colorList)
        Object.assign(label,{
          // show:false,
          position: 'outside',
          formatter: '{b}{c}时',
          // formatter: '{b}{c}时\n占比{d}%',
        })
        Object.assign(tooltip,{
          formatter: '{b}: {c}时 ({d}%)'
        })
        let data=res.returndata;
        this.excelData=data;
        if (data.length==0){
          this.myChart.setOption(this.$charts_setting.noDataOption,true)
          return false;
        }
        let seriesData = [
          {
            type: "pie",
            center: ["50%", "50%"],
            radius: ["30%", "55%"],
            label,
            avoidLabelOverlap:true,
            labelLine: {
              show: true
            },
            data: data.map(function (item, index) {
              if (index < 5) {
                return item
              } else {
                var obj = item;
                obj.label = {
                  show: false,
                  emphasis: {
                    show: false
                  }
                };
                obj.labelLine = {
                  show: false,
                  emphasis: {
                    show: false
                  }
                };
                return obj;
              }
            })
          }
        ];
        let option = {
          color: colorList,
          tooltip,
          legend,
          series: seriesData


        };
        this.myChart.setOption(option, true)
      },
      renderChart2(res){
        this.excelData2=res.outdata1;
        let tooltip = _.cloneDeep(this.$charts_setting.tooltipOption)
        let legend = _.cloneDeep(this.$charts_setting.legendOption)
        let label = _.cloneDeep(this.$charts_setting.labelOption)
        let colorList = _.cloneDeep(this.$charts_setting.colorList)
        let xAxis = _.cloneDeep(this.$charts_setting.xAxisOption)
        let yAxis = _.cloneDeep(this.$charts_setting.yAxisOption)
        let barOption = _.cloneDeep(this.$charts_setting.barOption)

        var yAxisData = res.outdata1.xAxis;
        if(yAxisData.length===0){
          this.myChart2.setOption(this.$charts_setting.noDataOption, true)
          return false;
        }

        var data = res.outdata1.data;

        var legendData = data.map(function (item) {
          return item.name;
        });

        var seriesData = data.map(function (item) {
          Object.assign(item,barOption)
          item.stack = '授权用时';
          item.type = 'bar';
          return item;
        });
        Object.assign(tooltip,{
          trigger: 'axis',
          position: ['10%', '80%'],
          formatter:function(params){
            var res = params[0].axisValueLabel;
            function getHtml(param){
              var str = '<div style="float: left"><span style="background: '+param.color+'; width: 11px; height: 11px; border-radius: 11px;float: left; margin: 5px 3px;"></span>'+
                param.seriesName+':'+param.data+'&emsp;&emsp;</div>';
              return str;
            }

            var flag=false;
            res += '<div style="clear: both">';
            for (var i = 0; i < params.length; i++) {
              res += getHtml(params[i]);
              if (params.length>11 && i%3==1){
                res += '</div><div style="clear: both">';
              }
              if (params.length <=11){
                res += '</div><div style="clear: both">';
              }
            }
            res += "</div>";
            return res;
          }
        })
        Object.assign(legend, {
          data: legendData,
        })
        Object.assign(xAxis, {
          data: yAxisData,
          type: 'category',
          inverse: true,
        })
        Object.assign(yAxis, {
          type: 'value',
        })

        var option = {
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

        this.myChart2.setOption(option, true)
      },
      downExcel(){
        let data={
          name:'在勤软件授权占用时长分布',
          data:[['序号','软件名称','授权占用时长(时)']]
        }
        this.excelData.map((item,key)=>{
          data.data.push([key+1,item.name,item.value]);
        })
        this.$current.exportExcel(data.name, data);
      },
      downExcel2(){
        let data={
          name:'辖下一级组织软件授权占用时长分布',
          data:[]
        }
        let titleArr=['序号','软件名称']
        this.excelData2.data.map(item=>{
          titleArr.push(item.name+'(时)')
        });
        data.data.push(titleArr);
        this.excelData2.xAxis.map((item,key)=>{
          let trArr=[key+1,item];
          this.excelData2.data.map(itemAdd=>{
            trArr.push(itemAdd.data[key])
          })
          data.data.push(trArr)
        })
        this.$current.exportExcel(data.name, data);
      }
    }
  }
</script>

<style scoped>

</style>
