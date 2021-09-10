<template>
  <div style="width:100%;">
    <div>
      <search-select ref="searchSelect" com="single" showdate="daterange" app="multiple"
                     dep="multiple"
                     baohan="1" @searchAction="searchLoad" @loadFinished="searchLoad"
                     @DownPdf="DownPdf"></search-select>
    </div>
    <div class="BgBody">

      <!--名片行-->
      <info-card ref="infoCard"/>
      <!--单位画像-->
      <tree-circle-info ref="treeCircleInfo"/>
      <!--在勤软件授权占用时长分布--><!--辖下一级组织软件授权占用时长分布--><!--在勤软件列表-->
      <empty-circle-pie ref="emptyCirclePie"/>
      <el-row>
        <!--辖下一级组织综合软件应用分析-->
        <radar-div ref="radarDiv"/>
        <!--盒须图-->
        <hexu-div ref="hexuDiv"/>
      </el-row>
      <!--top-->
      <tops-row-div ref="topsRowDiv"/>
      <!--软件峰值排行榜-->
      <peak-value-top ref="peakValueTop"/>
      <!--密集占用天数-->
      <miji-work ref="mijiWork"/>
      <!--高频应用-->
      <top-and-warning ref="topAndWarning"/>

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
