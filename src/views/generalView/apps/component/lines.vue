<template>
  <div style="width:100%;height:300px"></div>
</template>

<script>
  import { request } from '../../../../network'
  import ResizeObserverPolyfill from 'resize-observer-polyfill';

  export default {
    name: 'lines',
    data(){
      return{
        myChart:null,
        data:null
      }
    },
    mounted() {
      this.init();
    },
    methods:{
      init(){
        // 创建echarts对象
        if (!this.myChart) this.myChart= this.$echarts.init(this.$el)
        // 渲染echarts图表 - 暂无数据的提示
        this.myChart.setOption(this.$charts_setting.noDataOption,true)
        // 绑定resize函数
        new ResizeObserverPolyfill(entries => {
          // 注意，entres是个数组，数组项为每个需要监听的DOM节点
          entries.forEach(entry => {
            this.myChart.resize();
          })
        }).observe(this.$el)
      },
      renderFun(searchInfo){
        this.myChart.showLoading(_.cloneDeep(this.$charts_setting.loadingOption),true);
        this.data=null;
        request({
          url: '/Ashx/ISystemOverview.ashx',
          params: {
            ty: 'GetSoftView_Soft_TokenBf',
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
            var data = res.returndata;
            var xAxisData = res.outdata1;
            data = data.map(function (item) {
              return {
                name: item.name,
                type: 'line',
                smooth: true,
                symbolSize: 0,
                showSymbol: true,
                emphasis: {
                  focus: 'series'
                },
                data: item.data
              }
            });
            var lengendData = data.map(function (item) {
              return item.name
            });


            this.data={data,xAxisData,lengendData}




            let colorList=this.$charts_setting.colorList;


            let tooltip=_.cloneDeep(this.$charts_setting.tooltipOption);
            let legend=_.cloneDeep(this.$charts_setting.legendOption);
            let xAxis=_.cloneDeep(this.$charts_setting.xAxisOption);
            let yAxis=_.cloneDeep(this.$charts_setting.yAxisOption);
            legend.data=lengendData;
            Object.assign(tooltip,{
              trigger: 'axis',
              position: ['0%', '0%'],
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
            });
            Object.assign(xAxis,{
              type: 'category',
              boundaryGap: false,
              data: xAxisData,
            });

            var option = {
              color: colorList,
              tooltip,
              legend,
              grid: {
                top: '12%',
                left: 30,
                right: '4%',
                bottom: 10,
                containLabel: true
              },
              xAxis,
              yAxis,
              series: data
            };


            // 使用刚指定的配置项和数据显示图表。
            this.myChart.setOption(option,true);
          }else {
            this.myChart.setOption(this.$charts_setting.errOption(res.returnmsg),true)
          }
          this.myChart.resize();
        })
      },
      downExcel(){
        if (this.data){
          let data={
            name:'授权并发使用趋势',
            data:[]
          }
          let titleArr=['序号','日期']
          this.data.lengendData.map(item=>{
            titleArr.push(item)
          })
          data.data.push(titleArr);
          this.data.xAxisData.map((dataItem,dataKey)=>{
            let arr=[dataKey+1,dataItem]
            this.data.data.map((item,key)=>{
              arr.push(item.data[dataKey])
            })
            data.data.push(arr)
          })
          this.$current.exportExcel(data.name,data);
        }else {
          this.$message({
            message: '数据未加载，请加载后重试',
            type: 'warning'
          });
        }


      }
    }
  }
</script>

<style scoped>

</style>
