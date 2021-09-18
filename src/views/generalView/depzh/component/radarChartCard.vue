<template>
    <el-col :xs="xs" :sm="sm" :md="md" :lg="lg">
        <div class="cardBoxItem">
            <el-card shadow="hover">
                <card-box :style="{height:height+'px'}" :isfull="isfull">
                    <div class="cardBoxTitle">
                        <span>{{title_content}}</span>
                        <down-excel-tool @downExcel="downExcel"/>
                    </div>
                  <div class="cardBoxContent">
                    <radar-chart :state="state" :errinfo="errinfo" :data="data" ref="chart"/>
                  </div>
                </card-box>
            </el-card>
        </div>
    </el-col>
</template>
<script>
  import RadarChart from '@/components/Charts/RadarChart'
  export default {
    name: 'radarChartCard',
    components:{RadarChart},
    props: {
      xs: { type: Number, default: 24 },
      sm: { type: Number, default: 24 },
      md: { type: Number, default: 24 },
      lg: { type: Number, default: 24 },
      height: { type: Number, default: 400 },
      /**标题*/
      title_content: { type: String, default: '标题' },
      /**三种状态: nodata：无数据;loading：加载中;render：需要渲染;err：报错*/
      state: { type: String, default: 'nodata' },
      /**需要渲染的数据：受state影响
       * nodata:可传空;loading:可传空;render:传需要的数据;err:传报错信息,例如"登录超时!"*/
      data: {
        type:Object,
        default(){return {}}
      }
    },
    data() {
      return {
        isfull: false,//是否全屏
        errinfo:'',//报错信息
      }
    },
    watch: {
      state(newVal) {
        if (newVal === 'err') {
          this.errinfo=this.data;
        }
      }
    },
    mounted() {
    },
    methods: {
      renderChart(){
        this.$refs.chart.renderChart('circle');
      },
      downExcel(){
        this.$refs.chart.downExcel(this.title_content);
      }
    }
  }
</script>

<style scoped>

</style>
