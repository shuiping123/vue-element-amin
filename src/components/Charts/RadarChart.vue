<template>
    <div class="raderDiv" style="width:100%;height:100%"></div>
</template>

<script>
  export default {
    name: 'RaderChart',
    props:{
      /**
       * 三种状态
       * nodata：无数据
       * loading：加载中
       * render：需要渲染
       * err：报错
       * */
      state:{
        type:String,
        default:'nodata'
      },
      /**报错信息显示内容*/
      errinfo:{
        type:String,
        default:''
      },
      /**传入的数据*/
      data:{
        type:Object,
        default:{
          name:'',
          data:[],
          indicator:[]
        }
      }
    },
    data(){
      return {
        myChart:null
      }
    },
    watch:{
      state(){
        this.handleChange();
      }
    },
    mounted() {
      this.init();
    },
    methods:{
      // 初始化
      init (){
        // 创建echarts对象
        if (!this.myChart) this.myChart= this.$echarts.init(this.$el)
        // 渲染echarts图表 - 暂无数据的提示
        this.myChart.setOption(this.$charts_setting.noDataOption,true)
        // 绑定resize函数
        new ResizeObserver(entries => {
          // 注意，entres是个数组，数组项为每个需要监听的DOM节点
          entries.forEach(entry => {
            this.myChart.resize();
          })
        }).observe(this.$el)
      },
      // state值被改变，做出对应的处理
      handleChange(){
        this.myChart.hideLoading();
        if (this.state=='noData'){
          this.myChart.setOption(this.$charts_setting.noDataOption,true);
        }else if (this.state=='loading'){
          this.myChart.showLoading(this.$charts_setting.loadingOption);
        }else if(this.state=="render"){
          this.renderChart();
        }else {
          let errInfo=this.$charts_setting.errOption(this.errinfo);
          this.myChart.setOption(errInfo,true);
        }
      },
      renderChart(){
        if (!this.data.data.length){
          this.myChart.setOption(this.$charts_setting.noDataOption,true);
        }else {
          let name=this.data.name;
          let dataArr=this.data.data.map(function (item, index) {
            var obj = {
              name: item.name,
              value: item.value,
              // value: floatToIntegerUp(item.value),
              symbol: "none",
              lineStyle: {
                normal: {
                  color: "rgba(2255,255,255,0)"
                }
              },
              areaStyle: {
                normal: { // 单项区域填充样式
                  opacity: 0.5, // 区域透明度
                }
              }
            };
            return obj
          });
          let indicator=this.data.indicator;
          let colorList=_.cloneDeep(this.$charts_setting.colorList);
          let tooltip=_.cloneDeep(this.$charts_setting.tooltipOption);
          let legend=_.cloneDeep(this.$charts_setting.legendOption);
          let label=_.cloneDeep(this.$charts_setting.labelOption);
          let radarLabelName=_.cloneDeep(this.$charts_setting.radarLabelName);
          legend.data=this.data.data.map(item=>item.name);
          let option = {
            // color: ['#22CF96', '#3D7EFF'],
            color: colorList,
            legend,
            tooltip,
            radar: {
              center: ['50%', '55%'],
              radius: '65%',
              name: radarLabelName,
              indicator: indicator,
              splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
                show: false
              },
              axisLine: { //指向外圈文本的分隔线样式
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: '#ddd', // 分隔线颜色
                  width: 1, // 分隔线线宽
                }
              },
            },
            series: [{
              name: name,
              label,
              type: 'radar',
              symbolSize: 1,
              data: dataArr
            }]
          };
          this.myChart.setOption(option,true);
          this.myChart.resize();
        }
      }
    },
  }
</script>

<style scoped>

</style>
