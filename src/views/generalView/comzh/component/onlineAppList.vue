<template>
  <el-col :xs="24" :sm="24" :md="8" :lg="8">
    <div class="cardBoxItem">
      <el-card shadow="hover">
        <card-box style="height: 400px;">
          <div class="cardBoxTitle">
            <span>在勤软件列表</span>
            <down-excel-tool @downExcel="downExcel"/>
          </div>
          <div class="cardBoxContent" style="overflow-x:hidden;overflow-y: auto;">
            <div class="main-group onlineAppList" style="width:100%;height:100%;">
              <div style="width:100%;height:100%;" ref="errdiv" v-show="err"></div>
              <div class="items-box-group" v-show="!err">
                <ul class="items-group">
                  <li class="item-group item-group-li" v-for="(item,key) in data">
                    <div class="img">{{key+1}}</div>
                    <div class="item-data">
                      <div class="title">
                        {{item.name}}
                        <!--<span>[{{item.country}}]</span>-->
                        <span><img :src="item.countryUrl" style="height: 14px" :title="item.country" alt=""></span>
                        <tag-tab-tool title="跳转至软件概览查看" class="loadMore" @tagTab="tagTab"/>
                      </div>
                      <div class="item-price">
                        <div>
                          {{item.UsrNum}}人
                          <p>访问量</p>
                        </div>
                        <div>
                          {{item.FwPc}}次
                          <p>访问次数</p>
                        </div>
                        <div>
                          {{item.TokenHour}}时
                          <p>授权占用时长</p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>

              </div>
            </div>
          </div>
        </card-box>
      </el-card>
    </div>
  </el-col>

</template>

<script>
  import ResizeObserverPolyfill from 'resize-observer-polyfill';
  export default {
    name: 'onlineAppList',
    props: {
      data: {
        type: Array,
        default: []
      },
      statetype:{
        type:String,//loading 加载；err 错误；default 正常
        default:'default'
      },
      errinfo:{
        type:String,
        default:''
      }
    },
    data() {
      return {
        err:true,
        myChart:null
        // data:[],
      }
    },
    mounted() {
      let dom=this.$refs.errdiv;
      // 创建echarts对象
      if (!this.myChart) this.myChart = this.$echarts.init(dom)
      this.myChart.setOption(this.$charts_setting.noDataOption, true)
      new ResizeObserverPolyfill(entries => {
        // 注意，entres是个数组，数组项为每个需要监听的DOM节点
        entries.forEach(entry => {
          this.myChart.resize();
        })
      }).observe(dom)
    },
    watch:{
      statetype(newVal){
        this.err=true;
        this.myChart.hideLoading();
        if (newVal==='loading'){
          this.myChart.showLoading(this.$charts_setting.loadingOption, true)
        }
        else if (newVal==='err'){
          this.myChart.setOption(this.$charts_setting.errOption(this.errinfo), true)
        }
        else if (newVal==='default'){
          if (this.data.length===0){
            this.myChart.setOption(this.$charts_setting.noDataOption,true)
          }else {
            this.err=false;
          }
        }
      }
    },
    methods: {
      downExcel() {
        let data = {
          name: '在勤软件列表',
          data: [['序号', '软件名称','国家', '访问量(人)', '访问次数(次)', '授权占用时长(时)']]
        }
        this.data.map((item,key)=>{
          data.data.push([key+1,item.name,item.country,item.UsrNum,item.FwPc,item.TokenHour])
        })
        this.$current.exportExcel(data.name,data);
      },
      tagTab(){
        this.$current.tagTab('test2-2',{})
      },
    }
  }
</script>

<style scoped>
  .onlineAppList ul {
    list-style: none;
    margin: 0 !important;
    padding: 0 !important;
  }

  .onlineAppList .main-group {
    width: 100%;
    /*margin:80px auto;*/
  }

  .onlineAppList .item-group-li {
    padding: 5px !important;
    border-bottom: #f3f3f3 1px solid !important;
  }

  .onlineAppList .item-group-li:hover {
    background: rgb(246, 246, 255) !important;
  }

  .onlineAppList .items-box-group .items-group .item-group .img {
    width: 10%;
    text-align: center;
    background: url('./../assets/img/sort.png') no-repeat;
    background-size: 30px 30px;
    background-position: 50% 50%;
    height: 40px;
    line-height: 45px;
    color: #fff;
    font-weight: bold;
    font-size: 14px;
  }

  .onlineAppList .items-box-group .items-group .item-group {
    display: flex;
    width: 100%;
    align-items: center;
    background: #fff;
    margin-top: 0px;
    padding: 0px 0;
  }

  .onlineAppList .items-box-group .items-group .item-group .img {
    width: 10%;
    text-align: center;
    /*background: url(../imgs/sort.png) no-repeat;*/
    background-size: 30px 30px;
    background-position: 50% 50%;
    height: 40px;
    line-height: 45px;
    color: #fff;
    font-weight: bold;
    font-size: 14px
  }

  .onlineAppList .items-box-group .items-group .item-group .item-data {
    width: 90%;
    padding-left: 10px;
  }

  .onlineAppList .item-data .title {
    font-size: 14px;
    line-height: 1.5;
    /*font-weight: bold;*/
  }

  .onlineAppList .item-data .title span {
    color: #9e9e9e;
    margin-left: 10px;
  }

  .onlineAppList .item-price {
    width: 100%;
    display: flex;
    line-height: 1.5;
    /*margin-top: 5px;*/
  }

  .onlineAppList .item-price div {
    flex-grow: 1;
    font-size: 16px;
    font-weight: bold;
    color: var(--box-color-blue);
  }

  .onlineAppList .item-price div span {
    font-size: 16px
  }

  .onlineAppList .item-price div p {
    font-size: 12px;
    padding: 0;
    line-height: 1.5;
    margin: 0;
    color: #9e9e9e;
    font-weight: 400;
  }
  .onlineAppList .loadMore{
    color: #c5c5c5;
    font-size: 18px;
  }
  .onlineAppList .loadMore:hover{
    color: var(--box-color-blue);
    font-size: 18px;
  }
</style>
