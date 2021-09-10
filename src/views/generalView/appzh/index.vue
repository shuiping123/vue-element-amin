<template>
  <div style="width:100%;">
    <search-select ref="searchSelect" showdate="daterange"
                   baohan="1" @searchAction="searchLoad" @loadFinished="searchLoad"
                   @DownPdf="DownPdf"/>
    <div class="BgBody">

      <el-row>
        <el-col :xs="24" :sm="24" :md="16" :lg="16">
          <!--地图-->
          <div>
            <div class="cardBoxItem">
              <el-card shadow="hover">
                <world-map ref="worldmap" @updata_mapItem="updata_mapItem"/>
              </el-card>
            </div>
          </div>
          <!--四个块-->
          <div>
            <map-item title="关注软件总数" icon="el-icon-cpu" name="关注软件总数" :valuetext="mapItem[0]" util="个"/>
            <map-item title="在勤软件总数" icon="el-icon-cpu" name="在勤软件总数" :valuetext="mapItem[1]" util="个"/>
            <map-item title="公司用户总数" icon="el-icon-user" name="公司用户总数" :valuetext="mapItem[2]" util="人"/>
            <map-item title="关联厂商总数" icon="el-icon-office-building" name="关联厂商总数" :valuetext="mapItem[3]" util="个"/>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8">
          <!--预警-->
          <warring-div ref="warringDiv"/>
          <!--软件综合分析-->
          <radar-chart-div ref="radarChart_appszh"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <tree-chart ref="treeChart_appszh"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24">
          <!--软件峰值及访问量详情-->
          <peak-value ref="peakValue_appszh"/>
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
