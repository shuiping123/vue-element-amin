<template>
    <div class="cardBoxItem">
      <el-card shadow="hover">
        <card-box style="height: 370px" :isfull="isFull">
          <div class="cardBoxTitle">
            <span >关注软件资产分布</span>
            <fullscroll-tool :isfull.sync="isFull"/>
          </div>
          <div class="treeChart_appszh cardBoxContent"></div>
        </card-box>
      </el-card>
    </div>
</template>

<script>
  import { request } from '../../../../network'
  import ResizeObserverPolyfill from 'resize-observer-polyfill';

  export default {
    name: 'treeChart',
    data(){
      return {
        myChart:null,
        isFull:false,
      }
    },
    mounted() {
      this.init();
    },
    methods:{
      // 初始化
      init(){
        // 创建echarts对象
        if (!this.myChart)this.myChart=this.$echarts.init(document.getElementsByClassName('treeChart_appszh')[0]);
        // 实例化对象 - 渲染
        this.myChart.setOption(_.cloneDeep(this.$charts_setting.noDataOption),true);
        // 绑定resize事件
        new ResizeObserverPolyfill(entries => {
          // 注意，entres是个数组，数组项为每个需要监听的DOM节点
          entries.forEach(entry => {
            this.myChart.resize();
          })
        }).observe(document.getElementsByClassName('treeChart_appszh')[0])
      },
      // 渲染
      renderChart(searchInfo){
        this.myChart.showLoading(_.cloneDeep(this.$charts_setting.loadingOption),true);
        this.data=null;
        request({
          url: '/Ashx/ISystemOverview.ashx',
          params: {
            ty: 'GetAllSoftView_SoftUseFb',
            StartDate: searchInfo.StartDate,
            EndDate: searchInfo.EndDate,
            Is_Need_Count: searchInfo.Is_Need_Count
          }
        }).then(res => {
          this.myChart.hideLoading();
          if (res.returncode == 0) {
            let colorList=_.cloneDeep(this.$charts_setting.colorList)
            let tooltip=_.cloneDeep(this.$charts_setting.tooltipOption);
            let legend=_.cloneDeep(this.$charts_setting.legendOption);
            let label=_.cloneDeep(this.$charts_setting.labelOption);
            let xAxis=_.cloneDeep(this.$charts_setting.xAxisOption);
            let yAxis1=_.cloneDeep(this.$charts_setting.yAxisOption);
            let yAxis2=_.cloneDeep(this.$charts_setting.yAxisOption);
            let toolbox=_.cloneDeep(this.$charts_setting.toolboxOption);
            let treeOptions=_.cloneDeep(this.$charts_setting.treeOptions);
            Object.assign(tooltip,{
                trigger: 'item',
                triggerOn: 'mousemove',
            })
            Object.assign(label,{
              position: 'top',
              rotate: -90,
              verticalAlign: 'middle',
              align: 'right',
            })

            let data = res.returndata;

            var option = {
              tooltip,
              series: [
                {
                  type: 'tree',
                  id: 0,
                  name: 'tree1',
                  data: [data],
                  top: 40,
                  left: 10,
                  bottom: 90,
                  right: 15,
                  roam: true,//是否开启缩放和平移

                  orient: 'vertical',
                  // edgeShape: 'polyline',//线条是否显示直角
                  edgeForkPosition: '63%',
                  initialTreeDepth: 3,
                  lineStyle: treeOptions.lineStyle,
                  label,
                  leaves: {
                    label: {
                      position: 'right',
                      verticalAlign: 'middle',
                      align: 'left',
                    }
                  },
                  symbolSize: treeOptions.symbolSize,
                  symbol:treeOptions.symbol,
                  itemStyle:treeOptions.itemStyle,
                  expandAndCollapse: true,
                  animationDuration: 550,
                  animationDurationUpdate: 750
                }
              ]
            };

            // 使用刚指定的配置项和数据显示图表。
            this.myChart.setOption(option,true);
          }else {
            this.myChart.setOption(this.$charts_setting.errOption(res.returnmsg),true)
          }
          this.myChart.resize();
        })
      },
    }
  }
</script>

<style scoped>

</style>
