<template>
  <div style="width:100%">
    <div class="searchDiv">
      <search-select ref="searchSelect" com="single" showdate="daterange" app="single" dep="multiple"
                     @searchAction="searchLoad"
      ></search-select>
    </div>
    <button @click="getSearchData()">获取查询数据</button>
    <p>显示结果</p>
    <p>{{searchInfo}}</p>
    <el-row>
      <el-col :span="12" v-if="AppBasisInfo">
        <p class="form-inline">
          <img style="display: inline-block;line-height: 2vw;height: 1.6vw;width:auto"
               :src="AppBasisInfo.iconUrl" class="form-group col-xs-1">
          <!--                        <span style="background: #62BB46;color: #ffffff;display: inline-block;font-size: 12px;padding: 2px 8px;border-radius: 2px;">{{AppBasisInfo.country}}</span>-->
          <span class="form-group col-xs-8" style="font-size: 1.6vw;color: #3e3e3e;padding-left: 5px;display: inline-block;line-height: 1.6vw; overflow: hidden!important;
            text-overflow: ellipsis!important;
            white-space: nowrap;">{{AppBasisInfo.name}}</span>
          <!--                        <span class="form-group col-xs-3 blueColorFont" style="font-size: 1vw;padding-left: 5px;display: inline-block;line-height: 1.6vw; overflow: hidden;-->
          <!--            text-overflow: ellipsis;-->
          <!--            white-space: nowrap;" id="zhankaiId" @click="showDecInfo(AppBasisInfo.decInfo)">[ 软件描述 <b class="glyphicon glyphicon-triangle-bottom"></b> ]</span>-->
        </p>
        <p style="color: #a4a4a4;font-size: 1vw;line-height: 1.2vw">国家：
          <!--                        <img style="display: inline-block;height: 1vw" :src="guoqi(AppBasisInfo.country)"-->
          <img style="display: inline-block;height: 1vw" :src="AppBasisInfo.countryUrl"
               :title="AppBasisInfo.country">
          {{AppBasisInfo.country}}</p>
        <p style="color: #a4a4a4;font-size: 1vw;line-height: 1.2vw">厂商：{{AppBasisInfo.appCom}}</p>
        <p style="color: #a4a4a4;font-size: 1vw;line-height: 1.2vw">子软件：{{AppBasisInfo.childApp.join(' | ')}}</p>
        <p style="color: #a4a4a4;font-size: 1vw;line-height: 1.2vw">类别：{{AppBasisInfo.type}}</p>
        <p style="color: #a4a4a4;font-size: 1vw;line-height: 1.2vw;">描述： {{AppBasisInfo.decInfo}}</p>
        <!--                    <p style="color: #a4a4a4;font-size: 1vw;line-height: 1.2vw;height: 20%;background: #ebf2fa;white-space: normal;text-indent: 30px;" id="decId">{{AppBasisInfo.decInfo}}-->
      </el-col>
    </el-row>
    <div style="background: #dee8ed;width: 100%;height: 500px"></div>
  </div>
</template>

<script>
  import SearchSelect from '@/components/SelectDown/SearchSelect'
  import { request } from '@/network'

  export default {
    name: 'test2-6',
    data() {
      return {
        searchInfo: '',
        AppBasisInfo: null
      }
    },
    components: { SearchSelect },
    methods: {
      getSearchData() {
        this.searchInfo = this.$refs.searchSelect.getSearchData()
      },
      searchLoad() {
        this.getSearchData()

        request({
          url: '/Ashx/ISystemOverview.ashx',
          params: {
            ty: 'GetSoftView_Soft_BasicInfo',
            StartDate: this.searchInfo.date[0],
            EndDate: this.searchInfo.date[1],
            ComId: this.searchInfo.coms.join(','),
            ComFamId: this.searchInfo.apps.join(','),
            BaokouAllChildComId: 1,
            Is_Need_Count: 0
          }
        }).then(res => {
          if (res.returncode == 0) {
            this.AppBasisInfo = res.returndata
          }else if (res.returncode==2){
            this.$alert(res.returnmsg, '错误信息', {
              confirmButtonText: '重新登录',
              callback: action => {
                this.$current.toLoginOut(this);
              }
            });
          }else {
            this.$message.error(res.returnmsg);
          }
        })
      }
    }
  }
</script>

<style>
  .searchDiv {
    background: #F2F6FC;
    width: 100%;
  }

</style>
