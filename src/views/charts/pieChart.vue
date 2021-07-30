<template>
  <div class="bar chartDiv"/>
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
        if (this.watchLoad) {
          _this.myChart.setOption({}, true)
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
            text: _this.loading ? 'loading' : '某站点用户访问来源',
            subtext: '纯属虚构',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 234, name: '联盟广告' },
                { value: 135, name: '视频广告' },
                { value: 1548, name: '搜索引擎' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        if (option && typeof option === 'object') {
          _this.myChart.hideLoading()
          _this.myChart.setOption(option, true)
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
