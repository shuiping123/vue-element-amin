<template>
  <div style="width:100%;">
    <div>
      <search-select ref="searchSelect" com="single" showdate="daterange" app="single" dep="multiple"
                     baohan="1" @searchAction="searchLoad"></search-select>
    </div>
    <!--    <button @click="getSearchData()">获取查询数据</button>-->
    <!--    <p>显示结果</p>-->
    <!--    <p>{{searchInfo}}</p>-->
    <div class="BgBody">

      <el-row>
        <el-col :span="12">
          <div class="cardBoxItem">
            <el-card  shadow="hover">
              <div slot="header" class="clearfix">
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item>
                      <el-avatar :size="35" shape="square" fit="fill" :src="AppBasisInfo.iconUrl"></el-avatar>
                  </el-form-item>
                  <el-form-item><span class="infoCardTitle">{{AppBasisInfo.name}}</span></el-form-item>
                </el-form>
              </div>
                <div class="infoCardBody">
                  <el-form label-position="left" label-width="80px" class="demo-form-inline" size="mini">
                    <el-form-item label="国家：">
                      <el-form :inline="true" size="mini">
                        <el-form-item>
                          <el-avatar :size="25" style="background:none" shape="square" fit="fill">
                            <img style="display: inline-block;height:18px" :src="AppBasisInfo.countryUrl"
                                 :title="AppBasisInfo.country">
                          </el-avatar>
                        </el-form-item>
                        <el-form-item>
                          <span>{{AppBasisInfo.country}}</span>
                        </el-form-item>
                      </el-form>

                    </el-form-item>
                    <el-form-item label="厂商：">
                      <span>{{AppBasisInfo.appCom}}</span>
                    </el-form-item>
                    <el-form-item label="子软件：">
                      <span>{{AppBasisInfo.childApp.join(' | ')}}</span>
                    </el-form-item>
                    <el-form-item label="类别：">
                      <span>{{AppBasisInfo.type}}</span>
                    </el-form-item>
                    <el-form-item label="描述：">
                      <span>{{AppBasisInfo.decInfo}}</span>
                    </el-form-item>
                  </el-form>

                </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="12">
          <el-col :span="8" style="height: 50%;">
            <div class="cardBoxItem">
              <el-card shadow="hover"></el-card>
            </div>
          </el-col>
          <el-col :span="8" style="height: 50%;">
            <div class="cardBoxItem">
              <el-card shadow="hover"></el-card>
            </div>
          </el-col>
          <el-col :span="8" style="height: 50%;">
            <div class="cardBoxItem">
              <el-card shadow="hover"></el-card>
            </div>
          </el-col>
          <el-col :span="8" style="height: 50%;">
            <div class="cardBoxItem">
              <el-card shadow="hover"></el-card>
            </div>
          </el-col>
          <el-col :span="8" style="height: 50%;">
            <div class="cardBoxItem">
              <el-card shadow="hover"></el-card>
            </div>
          </el-col>
          <el-col :span="8" style="height: 50%;">
            <div class="cardBoxItem">
              <el-card shadow="hover"></el-card>
            </div>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="cardBoxItem">
            <el-card :body-style="{ padding: '0px'}" shadow="hover">
              <div slot="header" class="clearfix">
<!--                <span>卡片名称</span>-->
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item>
                    <img style="width: 2em" :src="AppBasisInfo.iconUrl"/>
                  </el-form-item>
                  <el-form-item>{{AppBasisInfo.name}}</el-form-item>
                </el-form>
              </div>
              <div>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>

                <p class="form-inline">

                  <!--                        <span style="background: #62BB46;color: #ffffff;display: inline-block;font-size: 12px;padding: 2px 8px;border-radius: 2px;">{{AppBasisInfo.country}}</span>-->
                  <span class="form-group col-xs-8" style="font-size: 1.6vw;color: #3e3e3e;padding-left: 5px;display: inline-block;line-height: 1.6vw; overflow: hidden!important;
            text-overflow: ellipsis!important;
            white-space: nowrap;"></span>
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
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="cardBoxItem">
            <el-card :body-style="{ padding: '0px'}" shadow="hover">
              <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                   class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time">{{ }}</time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>


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
        /**
         * 软件的基础信息
         * */
        AppBasisInfo: {
          name: '',//软件名
          childApp: [''],//子软件/模块的数组
          type: '',//类别
          country: '',//国家
          appCom: '',//厂商
          iconUrl: null,//软件图标路径
          countryUrl: '',//国家图标路径
          decInfo: '',//描述
        },
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
          } else if (res.returncode == 2) {
            this.$alert(res.returnmsg, '错误信息', {
              confirmButtonText: '重新登录',
              callback: action => {
                this.$current.toLoginOut(this)
              }
            })
          } else {
            this.$message.error(res.returnmsg)
          }
        })
      }
    }
  }
</script>

<style>
  .searchDiv {
    /*background: #F2F6FC;*/
    width: 100%;
  }

  /*名片表头*/
  .infoCardTitle{
    font: 	25px Extra large;
  }


  /*名片表身*/
  .infoCardBody{
    padding: 20px;
    font:14px Base ;
  }

  .infoCardBody .el-form-item{
    margin-bottom: 5px;
  }

</style>
