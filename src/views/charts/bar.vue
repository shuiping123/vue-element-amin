<template>
  <div class="bar chartDiv" />
</template>

<script>
export default {
  name: 'Bar',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      myChart: null
    }
  },
  computed: {
    watchLoad() {
      return this.loading
    }
  },
  watch: {
    watchLoad: function(newVal) {
      this.barFun()
    }
  },
  mounted() {
    this.barFun()
  },
  methods: {
    barFun() {
      const _this = this

      if (!_this.myChart) _this.myChart = this.$echarts.init(this.$el)
      console.log(this.watchLoad)

      if (this.watchLoad) {
        _this.myChart.setOption({},true);
        _this.myChart.showLoading({
          text: '数据正在加载...',
          textStyle: { fontSize: 30, color: '#444' },
          effectOption: { backgroundColor: 'rgba(0, 0, 0, 0)' }
        })
        return false
      }

      let option = null
      var xAxisData = []
      var data1 = []
      var data2 = []
      for (var i = 0; i < 100; i++) {
        xAxisData.push('类目' + i)
        data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
        data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)
      }

      option = {
        title: {
          text: '柱状图动画延迟'
        },
        legend: {
          data: ['bar', 'bar2']
        },
        toolbox: {
          // y: 'bottom',
          feature: {
            magicType: {
              type: ['stack', 'tiled']
            },
            dataView: {},
            saveAsImage: {
              pixelRatio: 2
            }
          }
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          splitLine: {
            show: false
          }
        },
        yAxis: {},
        series: [{
          name: 'bar',
          type: 'bar',
          data: data1,
          animationDelay: function(idx) {
            return idx * 10
          }
        }, {
          name: 'bar2',
          type: 'bar',
          data: data2,
          animationDelay: function(idx) {
            return idx * 10 + 100
          }
        }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function(idx) {
          return idx * 5
        }
      }
      if (option && typeof option === 'object') {
        _this.myChart.setOption(option, true)
        _this.myChart.hideLoading()
      }
      window.onresize = () => {
        _this.myChart.resize()
      }
    }
  }
}
</script>

<style>

</style>
