<template>
  <div class="warringDiv">
    <div class="cardBoxItem">
      <el-card shadow="hover" :body-style="{padding:'0px'}">
        <div style="width: 100%;height:100px;">
          <div class="warring-group">
            <div class="warring-item">
              <el-col :xs="10" :sm="10" :md="10" :lg="10">
                <div class="warring-icon-div"><i class="el-icon-date warring-icon"/></div>
              </el-col>
              <el-col :xs="14" :sm="14" :md="14" :lg="14" class="warring-content">
                <el-popover trigger="hover" placement="top-end">
                  <span>超期软件</span>
                  <div class="title ellipsisDiv" slot="reference">超期软件</div>
                </el-popover>
                <el-popover trigger="hover" placement="bottom-end">
                  <span>{{data[0]}}个</span>
                  <div class="value ellipsisDiv" slot="reference">{{data[0]}}个</div>
                </el-popover>
              </el-col>
            </div>
            <div class="warring-item">
              <el-col :xs="10" :sm="10" :md="10" :lg="10">
                <div class="warring-icon-div"><i class="el-icon-moon-night warring-icon"/></div>
              </el-col>
              <el-col :xs="14" :sm="14" :md="14" :lg="14" class="warring-content">
                <el-popover trigger="hover" placement="top-end">
                  <span>超期软件</span>
                  <div class="title ellipsisDiv" slot="reference">沉睡软件</div>
                </el-popover>
                <el-popover trigger="hover" placement="bottom-end">
                  <span>{{data[1]}}个</span>
                  <div class="value ellipsisDiv" slot="reference">{{data[1]}}个</div>
                </el-popover>
              </el-col>
            </div>
            <div class="warring-item">
              <el-col :xs="10" :sm="10" :md="10" :lg="10">
                <div class="warring-icon-div"><i class="el-icon-time warring-icon"/></div>
              </el-col>
              <el-col :xs="14" :sm="14" :md="14" :lg="14" class="warring-content">
                <el-popover trigger="hover" placement="top-end">
                  <span>超期软件</span>
                  <div class="title ellipsisDiv" slot="reference">超时软件</div>
                </el-popover>
                <el-popover trigger="hover" placement="bottom-end">
                  <span>{{data[2]}}个</span>
                  <div class="value ellipsisDiv" slot="reference">{{data[2]}}个</div>
                </el-popover>
              </el-col>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import { request } from '../../../../network'
  import ResizeObserverPolyfill from 'resize-observer-polyfill';

  export default {
    name: 'warringDiv',
    data(){
      return {
        data:[0,0,0]
      }
    },
    mounted() {
      this.init();
    },
    methods:{
      init(){
        this.data=[0,0,0];
      },
      renderFun(searchInfo){
        request({
          url: '/Ashx/ISystemOverview.ashx',
          params: {
            ty: 'GetAllSoftView_Cq_Cs_Yc',
            StartDate: searchInfo.StartDate,
            EndDate: searchInfo.EndDate,
            Is_Need_Count: searchInfo.Is_Need_Count
          }
        }).then(res => {
          if (res.returncode == 0) {
            this.data=res.returndata.map(item=>item.value);

          }else {
            this.data=this.data.map(item=>res.returnmsg)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .warringDiv .warring-group{
    width: 100%;
    height:100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
  }
 .warringDiv .warring-item{
    height: 60px;
    flex: 1;
   text-align: center;
   display: flex;
   align-items: center;
  }



  .warringDiv .warring-icon{
    padding: 8px;
    border-radius: 50px;
    background: var(--mini-box-color);
    color: var(--icon-card-color);
  }

  .warringDiv .warring-content{
    text-align: left;
  }
  .warringDiv .warring-content .title{
    font:12px Extra Small;
    line-height: 1.6;
  }
  .warringDiv .warring-content .value{
    font:16px Medium;
    font-weight: 500;
    line-height: 1.6;
  }
</style>
