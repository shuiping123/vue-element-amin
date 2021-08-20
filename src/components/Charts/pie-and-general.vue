<template>
  <div class="pie-and-general" style="width: 100%;height: 100%" />
</template>

<script>
  // 使用此组件，需要传入两个参数
  // loading当前加载的状态，
  //    0表示加载图表（如果图片无数据显示暂无数据）
  //    1表示显示loading动画
  // data传入数据
  //    如果是空对象，显示暂无数据

export default {
  name: 'pie-and-general',
  props: {
    loading: {
      type: Boolean,
      default: false//0显示图表 1显示loading 2显示暂无数据，初始化的时候用
    },
    data:{},//空数组显示无数据
  },
  data() {
    return {
      myChart: null
    }
  },
  watch: {
    loading(){
      this.handleChange();
    }
  },
  mounted() {
    this.init()
    this.handleChange();
  },
  methods: {
    init(){
      if (!this.myChart) this.myChart = this.$echarts.init(this.$el);
      this.myChart.setOption(this.$charts_setting.noDataOption,true);
      // window.addEventListener('resize', () => {
      //   this.myChart.resize();
      // })
      new ResizeObserver(entries => {
        // 注意，entres是个数组，数组项为每个需要监听的DOM节点
        entries.forEach(entry => {
          this.myChart.resize();
        })
      }).observe(this.$el)
    },
    handleChange(){
      if (this.loading){
        this.myChart.showLoading(this.$charts_setting.loadingOption)
      }else {
        this.barFun();
      }
    },
    barFun() {
      const _this = this
      const colorList=_.cloneDeep(this.$charts_setting.colorList)
      let data=this.data;
      if (Object.keys(data).length===0){
        this.myChart.setOption(this.$charts_setting.noDataOption,true);
      }else {
        let tooltip=_.cloneDeep(this.$charts_setting.tooltipOption);
        let legend=_.cloneDeep(this.$charts_setting.legendOption);
        let label=_.cloneDeep(this.$charts_setting.labelOption);
        tooltip.formatter= '{b}: {c} ({d}%)'
        var seriesData = [
          {
            type: "pie",
            center: ["50%", "50%"],
            radius: ["0", "25%"],
            label: {
              show: true,
              position: 'center',
              formatter: '{a|{b}}\n{c|{c}人}',
              rich: {
                a: {
                  color: '#fff',
                  fontSize: 11,
                  lineHeight: 20,
                  align: 'middle'
                },
                c: {
                  color: '#fff',
                  align: 'center',
                  fontSize: 15,
                }

              }
            },
            labelLine: {
              show: false
            },
            data: [{value: data.value, name: data.name}]
          },
          {
            type: "pie",
            center: ["50%", "50%"],
            radius: ["35%", "60%"],
            label: {
              show: true,
              fontSize:label.fontSize,
              fontFamily:label.fontFamily,
              position: 'outside',
              formatter: '{b}{c}人\n占比{d}%',
            },
            labelLine: {
              show: true
            },
            data: data.children.map(function (item, index) {
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
          color: colorList,
          tooltip,
          legend,
          series: seriesData


        };
        if (option && typeof option === 'object') {
          _this.myChart.hideLoading()
          _this.myChart.setOption(option, true)
        }
      }

    },
    resizeFun(){
      this.myChart.resize();
    },
    errFun(err){
      this.myChart.hideLoading()
      let errInfo=this.$charts_setting.errOption(err)
      this.myChart.setOption(errInfo,true)
    }
  }
}
</script>

<style>

</style>
