<template>
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
</template>
<script>
  import ResizeObserverPolyfill from 'resize-observer-polyfill'

  export default {
    name: 'highAndSleepAppCard',
    props: {
      xs: { type: Number, default: 24 },
      sm: { type: Number, default: 24 },
      md: { type: Number, default: 24 },
      lg: { type: Number, default: 24 },
      height: { type: Number, default: 400 },
      /**标题*/
      title_content: { type: String, default: '标题' },
      /**三种状态: nodata：无数据;loading：加载中;render：需要渲染;err：报错*/
      state: { type: String, default: 'nodata' },
      /**需要渲染的数据：受state影响
       * nodata:可传空;loading:可传空;render:传需要的数据;err:传报错信息,例如"登录超时!"*/
      data: {}
    },
    data() {
      return {
        activeName:'first',
        highFrequencyTable:[],
        isfull: false,//是否全屏
        myChart1: null,//erhart示例
        myChart2: null,//erhart示例
        excelData:{},//导出excel
      }
    },
    watch: {
      state() {
        this.handleChange()
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      /**初始化*/
      init() {
        let domDemo1 = this.$refs.chart
        let domDemo2 = this.$refs.chart2
        // 创建echarts对象
        if (!this.myChart1) this.myChart1 = this.$echarts.init(domDemo1)
        if (!this.myChart2) this.myChart2 = this.$echarts.init(domDemo2)
        // 渲染echarts图表 - 暂无数据的提示
        this.myChart1.setOption(this.$charts_setting.noDataOption, true)
        this.myChart2.setOption(this.$charts_setting.noDataOption, true)
        // 绑定resize函数
        new ResizeObserverPolyfill(entries => {
          // 注意，entres是个数组，数组项为每个需要监听的DOM节点
          entries.forEach(entry => {
            this.myChart1.resize()
          })
        }).observe(domDemo1)
        new ResizeObserverPolyfill(entries => {
          // 注意，entres是个数组，数组项为每个需要监听的DOM节点
          entries.forEach(entry => {
            this.myChart2.resize()
          })
        }).observe(domDemo2)
      },
      /**做state变化的操作处理*/
      handleChange() {
        this.myChart1.hideLoading()
        this.myChart2.hideLoading()
        if (this.state === 'noData') {
          this.myChart1.setOption(this.$charts_setting.noDataOption, true)
          this.myChart2.setOption(this.$charts_setting.noDataOption, true)
        } else if (this.state === 'loading') {
          this.myChart1.showLoading(this.$charts_setting.loadingOption)
          this.myChart2.showLoading(this.$charts_setting.loadingOption)
        } else if (this.state === 'render') {
          this.renderChart()
        } else {
          let func = this.$charts_setting.errOption
          this.myChart1.setOption(func(this.data), true)
          this.myChart2.setOption(func(this.data), true)
        }
      },
      /**渲染图表*/
      renderChart() {
        this.renderOption1(this.data)
        this.renderOption2(this.data)
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
        if (resData.length===0){
          this.myChart1.setOption(this.$charts_setting.noDataOption, true)
          return false;
        }

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
      /**导出excel*/
      downExcel() {
        let data = {
          name: this.title_content,
          data: [['序号', '单位名称']]
        }
        //做数据处理

        //最后导出
        let func = this.$current.exportExcel
        func(data.name, data)
      }
    }
  }
</script>

<style scoped>

</style>
