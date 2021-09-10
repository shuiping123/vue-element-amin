<template>
  <div style="width:100%;">
    <div>
      <search-select ref="searchSelect" com="single" showdate="daterange" app="single"
                     baohan="1" @searchAction="searchLoad" @loadFinished="searchLoad"
                     @DownPdf="DownPdf"></search-select>
    </div>
    <div class="BgBody">

      <el-row>
        <!--名片-->
        <el-col :xs="24" :sm="24" :md="8" :lg="10">
          <div class="cardBoxItem">
            <el-card shadow="hover">
              <div slot="header" class="clearfix infoCardTitle">
                <el-form :inline="true" class="demo-form-inline">
                  <el-form-item>
                    <el-avatar :size="35" style="background:none" shape="square" fit="fill">
                      <img :src="AppBasisInfo.iconUrl" :title="AppBasisInfo.iconUrl"/>
                    </el-avatar>
                  </el-form-item>
                  <el-form-item><span class="infoCardTitleSpan">{{AppBasisInfo.name}}</span></el-form-item>
                  <i class="el-icon-download downExcel floatBtn" title="导出excel" @click="downExcel_baseInfo"/>
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
                    <el-popover trigger="hover" placement="bottom-end">
                      <span>{{AppBasisInfo.childApp.join(' | ')}}</span>
                      <div class="ellipsisDiv" slot="reference">{{AppBasisInfo.childApp.join(' | ')}}</div>
                    </el-popover>
                  </el-form-item>
                  <el-form-item label="类别：">
                    <span>{{AppBasisInfo.type}}</span>
                  </el-form-item>
                  <el-form-item label="描述：">
                    <el-popover trigger="hover" placement="bottom-end">
                      <span>{{AppBasisInfo.decInfo}}</span>
                      <div class="ellipsisDiv" slot="reference">{{AppBasisInfo.decInfo}}</div>
                    </el-popover>
                  </el-form-item>
                </el-form>

              </div>
            </el-card>
          </div>
        </el-col>
        <!--六个块-->
        <el-col :xs="24" :sm="24" :md="16" :lg="14">
          <title-item :xs="24" :sm="8" :md="8" :lg="8" :data="TitleLst" @clickFun="transferStation"></title-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="15" :lg="15">
          <div class="cardBoxItem">
            <el-card shadow="hover">
              <tree-circle :searchinfo="searchInfo" ref="treeCircle"></tree-circle>
            </el-card>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="9" :lg="9">
          <div class="cardBoxItem">
            <el-card shadow="hover">
              <card-box style="height: 400px;">
                <div class="cardBoxTitle">
                  <span>用户使用分布</span>
                  <i class="el-icon-data-analysis loadMore floatBtn" title="查看更多"/>
                  <down-excel-tool @downExcel="downExcel_userUse"/>
                </div>
                <div class="cardBoxContent">
                  <pie-and-general ref="pieAndGeneral" :loading="userUsage.loading" :data="userUsage.data"/>
                </div>
              </card-box>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="9" :lg="9">
          <card-item :value="SixLst"></card-item>
        </el-col>
        <el-col :xs="24" :sm="16" :md="10" :lg="10">
          <div class="cardBoxItem">
            <el-card shadow="hover">
              <span class="cardBoxTitle">授权有效期和沉睡应用评估</span>
              <animation-pie ref="pingfen" :loading="pingfen.loading" :data1="pingfen.data"
                             :data2="pingfen.data2"></animation-pie>
            </el-card>
          </div>
        </el-col>
        <el-col :xs="24" :sm="8" :md="5" :lg="5">
          <div class="cardBoxItem">
            <el-card shadow="hover">
              <span class="cardBoxTitle">密集使用</span>
              <div style="text-align: center;">
                <h3>{{pingfen.mjDay}}{{pingfen.mjDay_util}}</h3>
                <p style="color:#6c757d;font:14px Base;line-height: 1.4;margin-top: 0;margin-bottom: 1rem;">
                  日最大峰值超过并发峰值中位数的天数</p>
                <a href="#" style="color:#7a6fbe;">总查询天数{{pingfen.mjDay_max}}{{pingfen.mjDay_util}}</a>
                <div>
                  <el-progress type="dashboard"
                               :stroke-width="10"
                               stroke-linecap="round"
                               :percentage="pingfen.mjDay_pecent"
                               color="#6e50f5"
                               style="margin-top: 25px"/>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="9" :lg="9">
          <div class="cardBoxItem">
            <el-card shadow="hover">
              <card-box>
                <div class="cardBoxTitle">
                  <span>综合分析</span>
                  <down-excel-tool @downExcel="downExcel_radar"/>
                </div>
                <div style="width:100%;height:300px;">
                  <radar-chart ref="radar" :state="radar.state" :errinfo="radar.errinfo" :data="radar.data"></radar-chart>
                </div>
              </card-box>
            </el-card>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="15" :lg="15">
          <div class="cardBoxItem">
            <el-card shadow="hover">
              <card-box>
                <div class="cardBoxTitle">
                  <span>访问及授权用时趋势</span>
                  <down-excel-tool @downExcel="downExcel_line"/>
                </div>
                <div style="width:100%;height:300px;">
                  <line_chart ref="line_chart"/>
                </div>
              </card-box>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="9" :md="9" :lg="9">
          <div class="cardBoxItem">
            <el-card shadow="hover">
              <div class="cardBoxTitle">
                <span>超长用时记录</span>
                <down-excel-tool @downExcel="downExcel_longTimeLst"/>
              </div>
              <div style="width:100%;padding-bottom:10px">
                <el-table
                  :data="longTimeLst"
                  height="350"
                  style="width: 100%">
                  <el-table-column
                    prop="UsrName"
                    sortable
                    label="用户"/>
                  <el-table-column
                    sortable
                    prop="StartDatetime"
                    label="日期"/>
                </el-table>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :xs="24" :sm="15" :md="15" :lg="15">
          <div class="cardBoxItem">
            <el-card shadow="hover">
              <!--原先的轮播图-->
              <routation ref="rautation"/>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <div class="cardBoxItem">
            <el-card shadow="hover">
              <div class="cardBoxTitle">
                <span>子版本访问量分布(辖下一级组织层级)</span>
                <down-excel-tool @downExcel="downExcel_piepiepie"/>
              </div>
              <div style="width:100%;padding-bottom:10px">
                <piepiepie ref="piepiepie"/>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <div class="cardBoxItem">
            <el-card shadow="hover">
             <div class="cardBoxTitle">
               <span>授权并发使用趋势</span>
               <down-excel-tool @downExcel="downExcel_lines"/>
             </div>
              <div style="width:100%;padding-bottom:10px">
                <lines ref="lines"/>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script src="./assets/index.js"></script>

<style>
  .searchDiv {
    /*background: #F2F6FC;*/
    width: 100%;
  }

  /*名片表头*/
  .infoCardTitle .el-form-item {
    margin-bottom: 0;
  }

  .infoCardTitleSpan {
    font: 25px Extra large;
  }


  /*名片表身*/
  .infoCardBody {
    padding: 20px;
    font: 14px Base;
  }

  .infoCardBody .el-form-item {
    margin-bottom: 5px;
  }

  /*以上名片结束*/


</style>
