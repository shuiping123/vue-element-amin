<template>
    <el-col :xs="xs" :sm="sm" :md="md" :lg="lg">
        <div class="cardBoxItem">
            <el-card shadow="hover">
                <card-box :style="{height:height+'px'}">
                    <div class="cardBoxTitle">
                        <span>{{title_content}}</span>
                        <down-excel-tool @downExcel="downExcel"/>
                    </div>
                    <div class="cardBoxContent" ref="chart"/>
                </card-box>
            </el-card>
        </div>
    </el-col>
</template>
<script>
  import ResizeObserverPolyfill from 'resize-observer-polyfill'

  export default {
    name: 'circlePieChart',
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
        isfull: false,//是否全屏
        colorList: _.cloneDeep(this.$charts_setting.colorList),//颜色序列
        tooltip: _.cloneDeep(this.$charts_setting.tooltipOption),//提示框样式
        legend: _.cloneDeep(this.$charts_setting.legendOption),//图例样式
        label: _.cloneDeep(this.$charts_setting.labelOption),//标示线样式
        labelLine: _.cloneDeep(this.$charts_setting.labelLineOption),//标示线样式
        myChart: null//erhart示例
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
        let domDemo = this.$refs.chart
        // 创建echarts对象
        if (!this.myChart) this.myChart = this.$echarts.init(domDemo)
        // 渲染echarts图表 - 暂无数据的提示
        this.myChart.setOption(this.$charts_setting.noDataOption, true)
        // 绑定resize函数
        new ResizeObserverPolyfill(entries => {
          // 注意，entres是个数组，数组项为每个需要监听的DOM节点
          entries.forEach(entry => {
            this.myChart.resize()
          })
        }).observe(domDemo)
      },
      /**做state变化的操作处理*/
      handleChange() {
        this.myChart.hideLoading()
        if (this.state === 'noData') {
          this.$emit('finishFun');
          this.myChart.setOption(this.$charts_setting.noDataOption, true)
        } else if (this.state === 'loading') {
          this.$emit('finishFun','loading');
          this.myChart.showLoading(this.$charts_setting.loadingOption)
        } else if (this.state === 'render') {
          this.renderChart()
        } else {
          this.$emit('finishFun');
          let func = this.$charts_setting.errOption
          this.myChart.setOption(func(this.data), true)
        }
      },
      /**渲染图表*/
      renderChart() {
        let color=this.colorList,
          tooltip=this.tooltip,
          label=this.label,
          labelLine=this.labelLine,
          legend=this.legend;
        let data=this.data;
        if (data.length==0){
          this.myChart.setOption(this.$charts_setting.noDataOption, true)
          this.$emit('finishFun');
          return false;
        }
        Object.assign(tooltip,{formatter: '{b}: {c}时 ({d}%)'})
        Object.assign(label,{position: 'outside', formatter: '{b}：{c}时'})
        var seriesData = [
          {
            type: "pie",
            center: ["50%", "50%"],
            radius: ["30%", "55%"],
            label,
            labelLine,
            data: data.map(function (item, index) {
              if (index < 5) {
                return item
              } else {
                var obj = item;
                obj.label = {
                  show: false,
                  emphasis: {
                    show: false
                  }
                };
                obj.labelLine = {
                  show: false,
                  emphasis: {
                    show: false
                  }
                };
                return obj;
              }
            })
          }
        ];
        var option = {
          color,
          tooltip,
          legend,
          series: seriesData
        };
        this.myChart.setOption(option, true)
        this.$emit('finishFun',data[0]);
        this.myChart.on('click', params=> {
          //此处的value值为饼状图里 data的name 值
          // this.$emit('loadMore',params.data)
          this.$emit('finishFun',params.data);

        });
      },
      /**导出excel*/
      downExcel() {
        let data = {
          name: this.title_content,
          data: [['序号', '软件','授权占用时长(时)']]
        }
        //做数据处理
        this.data.map((item,key)=>{
          data.data.push([key+1,item.name,item.value]);
        })
        //最后导出
        let func = this.$current.exportExcel
        func(data.name, data)
      }
    }
  }
</script>

<style scoped>

</style>
