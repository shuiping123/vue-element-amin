<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="16" :lg="16">
      <div class="cardBoxItem comTableInfo_dep_com">
        <el-card shadow="hover" style="position: relative">
          <div style="position: absolute;right: 25px;top: 25px;width:100%;z-index: 2">
            <down-excel-tool @downExcel="downExcel"/>
          </div>
          <div>
            <el-tabs v-model="activeName">
              <!--访问频次排行榜-->
              <el-tab-pane label="访问频次排行榜" name="first">
                <div style="display:flex;width:100%;height:300px;align-items: stretch">
                  <div style="width:50%">
                    <div ref="chart" style="width: 100%;height:100%;"></div>
                  </div>
                  <div style="width:50%">
                    <el-table
                      :data="highFrequencyTable"
                      height="350"
                      style="width: 100%">
                      <el-table-column type="index" label="序号"/>
                      <el-table-column width="50" label="国属">
                        <img slot-scope="params" :src="params.row.countryUrl" style="height: 10px" :title="params.row.value_2" alt=""/>
                      </el-table-column>
                      <el-table-column prop="name" label="软件"/>
                      <el-table-column sortable  prop="value" label="使用次数">
                        <span slot-scope="params">{{params.row.value}}次</span>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </el-tab-pane>
              <!--沉睡应用-->
              <el-tab-pane label="沉睡应用" name="second">
                <div style="width: 100%;height:300px;display: flex;align-items: stretch">
                  <div ref="chart2" style="flex: 1"></div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="8" :lg="8">
      <div class="cardBoxItem">
        <el-card shadow="hover">
          <card-box>
            <div class="cardBoxTitle">
              <span>超长用时</span>
              <down-excel-tool @downExcel="downExcel_longTime"/>
            </div>
            <div class="cardBoxContent">
              <el-table
                :data="longTimeLst"
                height="320"
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
          </card-box>
        </el-card>
      </div>
    </el-col>

  </el-row>
</template>

<script>
  import { request } from '../../../../network'
  import "echarts-wordcloud/dist/echarts-wordcloud";
  import ResizeObserverPolyfill from 'resize-observer-polyfill';
  export default {
    name: 'topAndWarning',
    data() {
      return {
        myChart: null,//echarts实例对象
        activeName: 'first', //tab选择的第几个
        highFrequencyTable:[],
        longTimeLst:[],//超长用时的数据
        excelData:{
          highFrequency:{},
          sleepApps:{}
        },

      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        let dom1 = this.$refs.chart
        let dom2 = this.$refs.chart2
        // 创建echarts对象
        if (!this.myChart1) this.myChart1 = this.$echarts.init(dom1)
        if (!this.myChart2) this.myChart2 = this.$echarts.init(dom2)
        // 渲染echarts图表 - 暂无数据的提示
        this.myChart1.setOption(this.$charts_setting.noDataOption, true)
        this.myChart2.setOption(this.$charts_setting.noDataOption, true)
        // 绑定resize函数
        new ResizeObserverPolyfill(entries => {
          // 注意，entres是个数组，数组项为每个需要监听的DOM节点
          entries.forEach(entry => {
            this.myChart1.resize()
          })
        }).observe(dom1)
        new ResizeObserverPolyfill(entries => {
          // 注意，entres是个数组，数组项为每个需要监听的DOM节点
          entries.forEach(entry => {
            this.myChart2.resize()
          })
        }).observe(dom2)
      },
      renderFun(searchInfo){
        this.renderChart(searchInfo);
        this.renderTableFun(searchInfo);
      },
      renderChart(searchInfo) {
        this.myChart1.showLoading(_.cloneDeep(this.$charts_setting.loadingOption), true)
        this.myChart2.showLoading(_.cloneDeep(this.$charts_setting.loadingOption), true)
        this.highFrequencyTable=[]
        request({
          url: '/Ashx/ISystemOverview.ashx',
          params: {
            ty: 'GetComView_SoftFwPc_NoUse',
            StartDate: searchInfo.StartDate,
            EndDate: searchInfo.EndDate,
            ComId: searchInfo.ComId.join(','),
            DepId: searchInfo.DepId.join(','),
            ComFamId: searchInfo.ComFamId.join(','),
            BaokouAllChildComId: searchInfo.BaokouAllChildComId,
            Is_Need_Count: searchInfo.Is_Need_Count
          }
        }).then(res => {
          this.myChart1.hideLoading()
          this.myChart2.hideLoading()
          if (res.returncode == 0) {
            this.renderOption1(res)
            this.renderOption2(res)
          } else {
            this.myChart1.setOption(this.$charts_setting.errOption(res.returnmsg), true)
            this.myChart2.setOption(this.$charts_setting.errOption(res.returnmsg), true)
          }
        })

      },
      renderOption1(res){
        let _this=this;
        let echarts=this.$echarts;
        let tooltip = _.cloneDeep(this.$charts_setting.tooltipOption)
        let legend = _.cloneDeep(this.$charts_setting.legendOption)
        let label = _.cloneDeep(this.$charts_setting.labelOption)
        let colorList = _.cloneDeep(this.$charts_setting.colorList)
        let xAxis = _.cloneDeep(this.$charts_setting.xAxisOption)
        let yAxis = _.cloneDeep(this.$charts_setting.yAxisOption)
        let dataZoom = _.cloneDeep(this.$charts_setting.dataZoomOption)
        let barOption = _.cloneDeep(this.$charts_setting.barOption)

        var resData = res.returndata;
        this.excelData.highFrequency=resData;
        this.highFrequencyTable=resData;
        var realData = res.returndata.slice(0, 5);


        var lineargroup = realData.map(function (item, index) {
          var num = 100 / (realData.length);
          var obj = {
            realval: item.value,
            value: 100 - num * index,
            name: item.name,
            oriname: "",
            number: '',
            color: [_this.$current.colorRgba(colorList[index], 0.8), _this.$current.colorRgba(colorList[index], 0)]
          };
          return obj;
        })


        var data1 = [];
        var data2 = [];

        for (var i = 0; i < lineargroup.length; i++) {
          var obj1 = {
            value: lineargroup[i].value,
            num: lineargroup[i].number,
            name: lineargroup[i].oriname,
            realval: lineargroup[i].realval,
          };

          var obj2 = {
            value: lineargroup[i].value,
            name: lineargroup[i].name,
            realval: lineargroup[i].realval,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                  offset: 0,
                  color: lineargroup[i].color[0]
                }, {
                  offset: 1,
                  color: lineargroup[i].color[1]
                }]),
                borderWidth: 0,
                opacity: 1
              }
            },
          };
          data1.push(obj1);
          data2.push(obj2);
        }

        Object.assign(tooltip,{
          formatter: function (param) {
            return '高频应用<br/>' + param.data.name + '：' + param.data.realval + '次'
          },
        })
        if (data1.length===0){
          this.myChart1.setOption(this.$charts_setting.noDataOption, true)
          return false;
        }
        var option = {
          color: colorList,
          tooltip,
          xAxis: {
            show: false
          },
          yAxis: {
            show: false,
          },
          series: [
            // 真实的主样式
            {
              top: '15%',
              bottom: '5%',
              type: 'funnel',
              gap: 10,
              minSize: 150,
              left: '30%',
              width: '60%',
              z: 2,
              tooltip: {
                show: false
              },
              label: {
                show: true,
                position: 'inside',
                fontSize: '14',
                rich: {
                  aa: {
                    padding: [8, 0, 6, 0]
                  }
                }
              },
              data: data1
            },
            // 浮动的颜色
            {
              top: '15%',
              bottom: '5%',
              type: 'funnel',
              gap: 10,
              minSize: 150,
              left: '0%',
              width: '80%',
              label: {
                normal: {
                  color: '#333',
                  position: 'insideLeft',
                  padding: [11, 25],
                  formatter: function (d) {
                    var ins = '{aa|' + d.name + '}\n{bb|' + d.data.realval + '次}';
                    return ins
                  },
                  rich: {
                    aa: {
                      align: 'center',
                      color: '#666',
                      fontSize: '12',
                      lineHeight: '15'
                    },
                    bb: {
                      align: 'center',
                      color: '#333',
                      fontSize: '16'
                    }
                  }
                }
              },
              data: data2
            },
          ]
        };
        this.myChart1.setOption(option, true)
      },
      renderOption2(res){
        var data = res.outdata1.slice();

        let tooltip = _.cloneDeep(this.$charts_setting.tooltipOption)
        let legend = _.cloneDeep(this.$charts_setting.legendOption)
        let label = _.cloneDeep(this.$charts_setting.labelOption)
        let colorList = _.cloneDeep(this.$charts_setting.colorList)
        let xAxis = _.cloneDeep(this.$charts_setting.xAxisOption)
        let yAxis = _.cloneDeep(this.$charts_setting.yAxisOption)
        let dataZoom = _.cloneDeep(this.$charts_setting.dataZoomOption)
        let barOption = _.cloneDeep(this.$charts_setting.barOption)


        Object.assign(tooltip,{
          formatter: function (params) {
            var name=params.name;
            var value=params.value;

            return '软件名称：'+name+' <br/>本次沉睡持续天数：'+value+'天'
          }
        })
        this.excelData.sleepApps=data
        if (data.length===0){
          this.myChart2.setOption(this.$charts_setting.noDataOption, true)
          return false;
        }
        let series = _.cloneDeep(this.$charts_setting.wordCloudOption(data))

        var option = {
          tooltip,
          series
        };
        this.myChart2.setOption(option, true)
      },
      renderTableFun(searchInfo){
        this.longTimeLst=[]
        request({
          url: '/Ashx/ISystemOverview.ashx',
          params: {
            ty: 'GetComView_LongTimeMx',
            StartDate: searchInfo.StartDate,
            EndDate: searchInfo.EndDate,
            ComId: searchInfo.ComId.join(','),
            DepId: searchInfo.DepId.join(','),
            ComFamId: searchInfo.ComFamId.join(','),
            BaokouAllChildComId: searchInfo.BaokouAllChildComId,
            Is_Need_Count: searchInfo.Is_Need_Count
          }
        }).then(res => {
          if (res.returncode == 0) {
            this.longTimeLst=res.outdata2;
          } else {

          }
        })
      },
      downExcel() {
        let data1 = {
          name: '访问频次排行榜',
          data: [['序号', '国家', '软件', '使用次数(次)']]
        }
        this.excelData.highFrequency.map((item,key)=>{
          data1.data.push([key+1,item.value_2,item.name,item.value])
        })
        let data2 = {
          name: '沉睡应用',
          data: [['序号', '软件名称', '本次沉睡持续天数(天)']]
        }
        this.excelData.sleepApps.map((item,key)=>{
          data2.data.push([key+1,item.name,item.value])
        })

        this.$current.exportExcel('高频应用排行和沉睡应用', data1, data2)
      },
      downExcel_longTime(){
        let data={
          name:'超长用时记录',
          data:[['序号','用户','日期']]
        }
        this.longTimeLst.map((item,key)=>{
          data.data.push([key+1,item.UsrName,item.StartDatetime])
        })
        this.$current.exportExcel(data.name,data);
      },
    }
  }
</script>

<style>
  .comTableInfo_dep_com .el-table__expanded-cell {
    padding: 0 !important;
  }
</style>
