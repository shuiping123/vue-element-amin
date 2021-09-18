<template>
  <div style="width:100%;">
    <div>
      <search-select ref="searchSelect" com="single" showdate="daterange" app="multiple"
                     dep="single" user="multiple"
                     baohan="1" @searchAction="searchLoad" @loadFinished="searchLoad"
                     @DownPdf="DownPdf"></search-select>
    </div>
    <div class="BgBody">
      <!--名片行-->
      <el-row>
        <!--用户名片-->
        <mingpian :data="BasisInfo"/>
        <!--六个内容块-->
        <title-lst :title-lst="TitleLst"/>
        <!--部门维度洞察-->
        <!--圆形树图-->
        <tree-chart :xs="24" :sm="24" :md="12" :lg="12" title_content="部门维度洞察" :state="treeChartAjax_state" :data="treeChartAjax_data"/>
        <!--详情表-->
        <tree-chart-table :xs="24" :sm="24" :md="12" :lg="12" title_content="部门维度洞察详情" :data="treeChartTableAjax_data" />
        <!--软件授权占用时长分布-->
        <!--环形饼图-->
        <!--@loadMore="loadMore"-->
        <circle-pie-chart :xs="24" :sm="24" :md="9" :lg="9" :height="350" title_content="软件授权占用时长分布"
                          @finishFun="finishFun"
                          :state="circlePieChartAjax_state"
                          :data="circlePieChartAjax_data"/>
        <!--软件使用趋势-->
        <!--柱形+双折线 趋势图-->
        <bar-line-trend :xs="24" :sm="24" :md="15" :lg="15" :height="350" :title_content="barLineTrendAjax_title"
                        :data="barLineTrendAjax_data"
                        :state="barLineTrendAjax_state"/>
        <!--软件峰值详情-->
        <peak-value-info :xs="24" :sm="24" :md="16" :lg="16" :height="350" title_content="软件峰值详情"
                         :data="peakValueInfoAjax_data"
                         :state="peakValueInfoAjax_state"/>
        <!--软件综合应用分析-->
        <radar-chart-card :xs="24" :sm="24" :md="8" :lg="8" :height="350" title_content="软件综合分析"
                         :data="radarChartCardAjax_data"
                         :state="radarChartCardAjax_state"/>
        <!--用户日均授权占用时长排行-->
        <top-for-usr-avg-time :xs="24" :sm="24" :md="8" :lg="8" :height="350" title_content="用户日均授权占用时长排行"
                          :data="topsAjax_usrAvgTime_data"
                          :state="topsAjax_state"/>
        <!--软件来源厂商访问量排行-->
        <top-for-cs :xs="24" :sm="24" :md="8" :lg="8" :height="350" title_content="软件来源厂商访问量排行"
                          :data="topsAjax_cs_data"
                          :state="topsAjax_state"/>
        <!--软件来源国维度访问量排行-->
        <top-for-country :xs="24" :sm="24" :md="8" :lg="8" :height="350" title_content="软件来源国维度访问量排行"
                          :data="topsAjax_country_data"
                          :state="topsAjax_state"/>
        <!--高频和沉睡应用-->
        <high-and-sleep-app-card :xs="24" :sm="24" :md="12" :lg="12"
                                 :data="highAndSleepAppCardAjax_data"
                                 :state="highAndSleepAppCardAjax_state"/>
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
