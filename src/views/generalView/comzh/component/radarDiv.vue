<template>
  <el-col :xs="24" :sm="24" :md="10" :lg="10">
    <div class="cardBoxItem">
      <el-card shadow="hover">
        <card-box style="height: 400px;">
          <div class="cardBoxTitle">
            <span>辖下一级组织综合软件应用分析</span>
            <down-excel-tool @downExcel="downExcel"/>
          </div>
          <div class="cardBoxContent">
            <radar-chart :state="state" :errinfo="errinfo" :data="data" ref="radarItem_com"/>
          </div>
        </card-box>
      </el-card>
    </div>
  </el-col>
</template>

<script>
  import {request} from '../../../../network'
  import RadarChart from '@/components/Charts/RadarChart'
  import ResizeObserverPolyfill from 'resize-observer-polyfill';
  export default {
    name: 'radarDiv',
    components:{RadarChart},
    data(){
      return {
        state:'noData',
        errinfo:'',
        data:{
          name:'辖下一级组织综合软件应用分析',
          data:[],
          indicator:[]
        }
      }
    },
    methods:{
      renderChart(searchInfo){
        this.state='loading'
        request({
          url: '/Ashx/ISystemOverview.ashx',
          params: {
            ty: 'GetComView_ComprehensiveAnalysis',
            StartDate: searchInfo.StartDate,
            EndDate: searchInfo.EndDate,
            ComId: searchInfo.ComId.join(','),
            DepId: searchInfo.DepId.join(','),
            ComFamId: searchInfo.ComFamId.join(','),
            BaokouAllChildComId: searchInfo.BaokouAllChildComId,
            Is_Need_Count: searchInfo.Is_Need_Count
          }
        }).then(res => {
          if (res.returncode == 0) {
            this.state='render';
            this.data={
              data:res.outdata1,
              indicator:res.returndata,
            }
          }  else {
            this.state='err';
            this.errinfo=res.returnmsg;
          }
        })
      },
      downExcel(){
        this.$refs.radarItem_com.downExcel(this.data.name)
      }
    }
  }
</script>

<style scoped>

</style>
