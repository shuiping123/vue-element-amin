<template>
  <div style="width:100%;height:300px"></div>
</template>

<script>
  import { request } from '../../../../network'
  import ResizeObserverPolyfill from 'resize-observer-polyfill';

  export default {
    name: 'piepiepie',
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
            ty: 'GetSoftView_ComModulFwl',
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

            this.data=res.returndata;

            let colorList=this.$charts_setting.colorList;
            var pageNum = 3;//每页显示多少个饼图
            var timeLinePointNum = Math.ceil(res.returndata.length / 3);//计算有几页,向上取整
            var dataArr = function () {
              var arr = res.returndata;
              for (var i = 0; i <= (timeLinePointNum * pageNum - res.returndata.length); i++) {
                arr.push({
                  name: "",
                  data: []
                })
              }
              return arr;
            };
            // 计算出时间轴上每个点显示什么
            var timeLinePoint = [];
            var legendArr = res.outdata1;
            var a = 0;//当前处于第几个饼状图
            var titleArr = [];
            var seriesArr = [];
            dataArr().map(function (item, index) {
              titleArr.push({
                text: item.name,
                left: ((1 / pageNum * a + 1 / pageNum / 2) * 100) + '%',
                top: '10%',
                textAlign: 'center'
              });
              seriesArr.push({
                name: item.name,
                type: 'pie',
                label:{show:false},
                labelLine:{show:false},
                radius: '30%',
                center: [((1 / pageNum * a + 1 / pageNum / 2) * 100) + '%', '50%'],
                data: item.data
              });
              a < (pageNum - 1) ? a++ : a = 0;
            });
            var options = [];
            for (var i = 0; i < timeLinePointNum; i++) {
              timeLinePoint.push('第' + (i + 1) + '页');
              options.push({
                color: colorList,
                title: titleArr.slice(i * pageNum, (i + 1) * pageNum),
                series: seriesArr.slice(i * pageNum, (i + 1) * pageNum)
              })
            }

            let tooltip=_.cloneDeep(this.$charts_setting.tooltipOption);
            let legend=_.cloneDeep(this.$charts_setting.legendOption);
            let timeline=_.cloneDeep(this.$charts_setting.timelineOption);
            legend.data=legendArr;
            timeline.data= timeLinePoint;


            var option = {
              baseOption: {
                timeline,
                tooltip,
                legend,
                calculable: true,
                grid: {
                  top: 80,
                  bottom: 100,
                },
              },
              options: options
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
            name:'子版本访问量分布(辖下一级组织层级)',
            data:[['单位','模块','访问量(人)']]
          }
          this.data.map((dataItem,dataKey)=>{
            dataItem.data.map((item,key)=>{
              data.data.push([dataItem.name,item.name,item.value]);
            })
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
