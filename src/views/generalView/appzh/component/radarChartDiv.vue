<template>
  <div>
    <div class="cardBoxItem">
      <el-card shadow="hover">
        <div class="cardBox" style="height: 330px;">
          <div class="cardBoxTitle">
            <span>软件综合分析</span>
            <down-excel-tool @downExcel="downExcel"/>
          </div>
          <div class="cardBoxContent">
            <radar-chart :state="state" :errinfo="errinfo" :data="data" ref="radarItem_appzh"/>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import RadarChart from '@/components/Charts/RadarChart'
  import { request } from '../../../../network'
  import ResizeObserverPolyfill from 'resize-observer-polyfill';

  export default {
    name: 'radarChartDiv',
    components:{RadarChart},
    data(){
      return {
        state:'noData',
        errinfo:'',
        data:{
          name:'软件综合分析',
          data:[],
          indicator:[]
        }
      }
    },
    methods:{
      renderChart(searchInfo){
        this.state = 'loading';
        request({
          url: '/Ashx/ISystemOverview.ashx',
          params: {
            ty: 'GetAllSoftView_ZHFX',
            StartDate: searchInfo.StartDate,
            EndDate: searchInfo.EndDate,
            Is_Need_Count: searchInfo.Is_Need_Count
          }
        }).then(res => {
          if (res.returncode == 0) {
            this.state='render';
            this.data={
              data:res.outdata1,
              indicator:res.returndata,
            }
          }else {
            this.state='err';
            this.errinfo=res.returnmsg;
          }
        })
      },
      downExcel(){
        this.$refs.radarItem_appzh.downExcel('软件综合分析')
      }
    },
  }
</script>

<style scoped>

</style>
