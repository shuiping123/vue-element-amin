<template>
  <el-col :xs="24" :sm="24" :md="10" :lg="9">
    <div class="cardBoxItem">
      <el-card shadow="hover">
        <div slot="header" class="clearfix infoCardTitle">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <i class="el-icon-s-check"
                 style="background:var(--mini-box-color);
                       color:#ffffff;font-size:20px
                       ;font-weight:bold;padding:8px;border-radius:5px;"/>
            </el-form-item>
            <el-form-item><span class="infoCardTitleSpan">{{BasisInfo.name}}</span></el-form-item>
            <i class="el-icon-download downExcel floatBtn" title="导出excel" @click="downExcel_baseInfo"/>
          </el-form>
        </div>
        <div class="infoCardBody">
          <el-form label-position="left" label-width="110px" class="demo-form-inline" size="mini">
            <el-form-item label="历史数据周期:" style="color: var(--box-color-font-blue)">
              <el-popover trigger="hover" placement="bottom-end">
                <span>{{BasisInfo.historyDate}}</span>
                <div class="ellipsisDiv" slot="reference">{{BasisInfo.historyDate}}</div>
              </el-popover>
            </el-form-item>
            <el-form-item label="专家数量：">
                <div class="ellipsisDiv"><span>{{BasisInfo.expertNum}}人</span></div>
            </el-form-item>
            <el-form-item label="总用户数：">
              <span>{{BasisInfo.UsrNum}}人</span>
            </el-form-item>
            <el-form-item label="总设备数：">
              <span>{{BasisInfo.DevNum}}台</span>
            </el-form-item>
            <el-form-item label="纳入监控软件：">
              <span>{{BasisInfo.AppNum_jk}}个 / {{BasisInfo.AppNum}}个</span>
            </el-form-item>
            <el-form-item label="岗位专业软件：">
              <el-popover trigger="hover" placement="bottom">
                <span>{{BasisInfo.Apps_PH.length?BasisInfo.Apps_PH.join(' | '):' - '}}</span>
                <div class="ellipsisDiv" slot="reference">
                  <span>{{BasisInfo.Apps_PH.length?BasisInfo.Apps_PH.join(' | '):' - '}}</span>
                </div>
              </el-popover>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </el-col>
</template>

<script>

  export default {
    name: 'mingpian',
    props:['data'],
    data() {
      return {
        /**用户名片 - 初始化数据*/
        BasisInfo: {
          name: '配管室',//部门名称
          historyDate: '2020-10-20 - 至今',//历史监测周期
          expertNum: 0,//专家数量
          UsrNum: 0,//总用户数
          DevNum: 0,//总设备数
          AppNum: 0,//总软件数
          AppNum_jk: 0,//软件纳入监控数
          Apps_PH: [],//部门偏好软件
        },
      }
    },
    watch:{
      data(newVal){
        this.BasisInfo=newVal;
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      /**导出excel*/
      downExcel_baseInfo(){
        let data={
          name:'部门名片',
          data:[
            ['部门名称',this.BasisInfo.name],
            ['历史数据周期',this.BasisInfo.historyDate],
            ['专家数量',this.BasisInfo.expertNum+'人'],
            ['总用户数',this.BasisInfo.UsrNum+'人'],
            ['总设备数',this.BasisInfo.DevNum+'台'],
            ['纳入监控软件(关键)',this.BasisInfo.AppNum_jk+'个 / '+this.BasisInfo.AppNum+'个'],
            ['岗位专业软件',this.BasisInfo.Apps_PH.join(' | ')],
          ],
        };
        this.$current.exportExcel(data.name, data);
      },
    }
  }
</script>

<style scoped>

</style>
