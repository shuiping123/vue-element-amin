<template>
  <div>
    <el-col :xs="12" :sm="12" :md="12" :lg="12">
      <div id="SQPG_XX" style="width:100%;" :style="{height:height}"></div>
    </el-col>
    <el-col :xs="12" :sm="12" :md="12" :lg="12">
      <div id="SQPG" style="width:100%;" :style="{height:height}"></div>
    </el-col>

  </div>
</template>

<script>
  import ResizeObserverPolyfill from 'resize-observer-polyfill';

  export default {
    name: 'animationPie',
    props: {
      height: {
        type: String,
        default: '280px'
      },
      data1: {
        type: Object,
        default: {
          // value: 0,
          // max: 0,
          // util: '天'
        }
      },
      data2: {
        type: Object,
        default: {
          // fenshu: 100,
          // text: '正常'
        }
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        pingfen_jd_Echarts: null,
        pingfenEcharts: null,
        intervalFun: null
      }
    },
    watch: {
      loading() {
        this.handleChange()
      }
    },
    mounted() {
      this.init()
      this.handleChange()
    },
    methods: {
      init() {
        // 创建echarts对象
        if (!this.pingfen_jd_Echarts) this.pingfen_jd_Echarts = this.$echarts.init(document.getElementById('SQPG_XX'))
        if (!this.pingfenEcharts) this.pingfenEcharts = this.$echarts.init(document.getElementById('SQPG'))
        // 渲染echarts图表 - 暂无数据的提示
        this.pingfen_jd_Echarts.setOption(this.$charts_setting.noDataOption, true)
        this.pingfenEcharts.setOption(this.$charts_setting.noDataOption, true)
        // 绑定resize函数
        new ResizeObserverPolyfill(entries => {
          // 注意，entres是个数组，数组项为每个需要监听的DOM节点
          entries.forEach(entry => {
            this.pingfen_jd_Echarts.resize()
          })
        }).observe(document.querySelector('#SQPG_XX'))
        new ResizeObserverPolyfill(entries => {
          // 注意，entres是个数组，数组项为每个需要监听的DOM节点
          entries.forEach(entry => {
            this.pingfenEcharts.resize()
          })
        }).observe(document.querySelector('#SQPG'))
      },
      handleChange() {
        if (this.loading) {
          this.pingfen_jd_Echarts.showLoading(this.$charts_setting.loadingOption)
          this.pingfenEcharts.showLoading(this.$charts_setting.loadingOption)
        } else {
          this.pingfen_jd_Echarts.hideLoading()
          this.pingfenEcharts.hideLoading()
          this.setEchart()
          this.setEchart2()
        }
      },
      setEchart() {
        const _this = this
        let angle = 0 //角度，用来做简单的动画效果的
        if (!Object.keys(this.data1).length) {
          this.pingfen_jd_Echarts.hideLoading()
          this.pingfen_jd_Echarts.setOption(this.$charts_setting.noDataOption, true)
          return false
        } else {
          let value = this.data1.value
          let general = this.data1.max
          var util = this.data1.util
          value = value >= 0 ? value : 0
          let name = '距离到期'
          var timerId
          var option = {
            title: {
              text: '{a|' + value + '} {c|' + util + '}\n' + name,
              x: 'center',
              y: 'center',

              textStyle: {
                color: '#909090',
                fontSize: '75%',
                rich: {
                  a: {
                    fontSize: '120%',
                    color: '#29EEF3',
                    padding: [10, 5]
                  },

                  c: {
                    fontSize: '80%',
                    color: '#29EEF3',
                    // color: '#ffffff',
                    padding: [15, 5]
                  }
                }
              }
            },

            series: [
              // 紫色
              {
                name: 'ring5',
                type: 'custom',
                coordinateSystem: 'none',
                renderItem: function(params, api) {
                  return {
                    type: 'arc',
                    shape: {
                      cx: api.getWidth() / 2,
                      cy: api.getHeight() / 2,
                      r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.7,
                      startAngle: (0 + angle) * Math.PI / 180,
                      endAngle: (90 + angle) * Math.PI / 180
                    },
                    style: {
                      stroke: '#4386FA',
                      fill: 'transparent',
                      lineWidth: 1.5
                    },
                    silent: true
                  }
                },
                data: [0]
              }, {
                name: 'ring5', //紫点
                type: 'custom',
                coordinateSystem: 'none',
                renderItem: function(params, api) {
                  let x0 = api.getWidth() / 2
                  let y0 = api.getHeight() / 2
                  let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.7
                  let point = getCirlPoint(x0, y0, r, (90 + angle))
                  return {
                    type: 'circle',
                    shape: {
                      cx: point.x,
                      cy: point.y,
                      r: 4
                    },
                    style: {
                      stroke: '#4386FA', //绿
                      fill: '#4386FA'
                    },
                    silent: true
                  }
                },
                data: [0]
              },
              // 蓝色

              {
                name: 'ring5',
                type: 'custom',
                coordinateSystem: 'none',
                renderItem: function(params, api) {
                  return {
                    type: 'arc',
                    shape: {
                      cx: api.getWidth() / 2,
                      cy: api.getHeight() / 2,
                      r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.75,
                      startAngle: (180 + angle) * Math.PI / 180,
                      endAngle: (270 + angle) * Math.PI / 180
                    },
                    style: {
                      stroke: '#4386FA',
                      fill: 'transparent',
                      lineWidth: 1.5
                    },
                    silent: true
                  }
                },
                data: [0]
              },
              {
                name: 'ring5', // 蓝色
                type: 'custom',
                coordinateSystem: 'none',
                renderItem: function(params, api) {
                  let x0 = api.getWidth() / 2
                  let y0 = api.getHeight() / 2
                  let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.75
                  let point = getCirlPoint(x0, y0, r, (180 + angle))
                  return {
                    type: 'circle',
                    shape: {
                      cx: point.x,
                      cy: point.y,
                      r: 4
                    },
                    style: {
                      stroke: '#4386FA', //绿
                      fill: '#4386FA'
                    },
                    silent: true
                  }
                },
                data: [0]
              },

              {
                name: 'ring5',
                type: 'custom',
                coordinateSystem: 'none',
                renderItem: function(params, api) {
                  return {
                    type: 'arc',
                    shape: {
                      cx: api.getWidth() / 2,
                      cy: api.getHeight() / 2,
                      r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85,
                      startAngle: (270 + -angle) * Math.PI / 180,
                      endAngle: (40 + -angle) * Math.PI / 180
                    },
                    style: {
                      stroke: '#4386FA',
                      fill: 'transparent',
                      lineWidth: 1.5
                    },
                    silent: true
                  }
                },
                data: [0]
              },
              // 橘色

              {
                name: 'ring5',
                type: 'custom',
                coordinateSystem: 'none',
                renderItem: function(params, api) {
                  return {
                    type: 'arc',
                    shape: {
                      cx: api.getWidth() / 2,
                      cy: api.getHeight() / 2,
                      r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85,
                      startAngle: (90 + -angle) * Math.PI / 180,
                      endAngle: (220 + -angle) * Math.PI / 180
                    },
                    style: {
                      stroke: '#4386FA',
                      fill: 'transparent',
                      lineWidth: 1.5
                    },
                    silent: true
                  }
                },
                data: [0]
              },
              {
                name: 'ring5',
                type: 'custom',
                coordinateSystem: 'none',
                renderItem: function(params, api) {
                  let x0 = api.getWidth() / 2
                  let y0 = api.getHeight() / 2
                  let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85
                  let point = getCirlPoint(x0, y0, r, (90 + -angle))
                  return {
                    type: 'circle',
                    shape: {
                      cx: point.x,
                      cy: point.y,
                      r: 4
                    },
                    style: {
                      stroke: '#4386FA', //粉
                      fill: '#4386FA'
                    },
                    silent: true
                  }
                },
                data: [0]
              },
              {
                name: 'ring5', //绿点
                type: 'custom',
                coordinateSystem: 'none',
                renderItem: function(params, api) {
                  let x0 = api.getWidth() / 2
                  let y0 = api.getHeight() / 2
                  let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85
                  let point = getCirlPoint(x0, y0, r, (270 + -angle))
                  return {
                    type: 'circle',
                    shape: {
                      cx: point.x,
                      cy: point.y,
                      r: 4
                    },
                    style: {
                      stroke: '4386FA', //绿
                      fill: '4386FA'
                    },
                    silent: true
                  }
                },
                data: [0]
              },
              {
                // name: '吃猪肉频率',
                type: 'pie',
                radius: ['60%', '48%'],
                silent: true,
                clockwise: true,
                startAngle: 90,
                z: 0,
                zlevel: 0,
                label: {
                  normal: {
                    position: 'center'

                  }
                },
                data: [{
                  value: value,
                  name: '',
                  itemStyle: {
                    normal: {
                      color: { // 完成的圆环的颜色
                        colorStops: [{
                          offset: 0,
                          color: '#A098FC' // 0% 处的颜色
                        },
                          {
                            offset: 0.3,
                            color: '#4386FA' // 0% 处的颜色
                          },
                          {
                            offset: 0.6,
                            color: '#4FADFD' // 0% 处的颜色
                          },
                          {
                            offset: 0.8,
                            color: '#0CD3DB' // 100% 处的颜色
                          }, {
                            offset: 1,
                            color: '#646CF9' // 100% 处的颜色
                          }
                        ]
                      }
                    }
                  }
                },
                  {
                    value: general - value,
                    name: '',
                    label: {
                      normal: {
                        show: false
                      }
                    },
                    itemStyle: {
                      normal: {
                        color: '#E3F0FF'
                      }
                    }
                  }
                ]
              },
              {
                // name: '吃猪肉频率',
                type: 'pie',
                radius: ['38%', '43%'],
                silent: true,
                clockwise: true,
                startAngle: 270,
                z: 0,
                zlevel: 0,
                label: {
                  normal: {
                    position: 'center'

                  }
                },
                data: [{
                  value: value,
                  name: '',
                  itemStyle: {
                    normal: {
                      color: { // 完成的圆环的颜色
                        colorStops: [{
                          offset: 0,
                          color: '#00EDF3' // 0% 处的颜色
                        }, {
                          offset: 1,
                          color: '#646CF9' // 100% 处的颜色
                        }]
                      }
                    }
                  }
                },
                  {
                    value: general - value,
                    name: '',
                    label: {
                      normal: {
                        show: false
                      }
                    },
                    itemStyle: {
                      normal: {
                        color: '#E3F0FF'
                      }
                    }
                  }
                ]
              }

            ]
          }

          //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
          function getCirlPoint(x0, y0, r, angle) {
            let x1 = x0 + r * Math.cos(angle * Math.PI / 180)
            let y1 = y0 + r * Math.sin(angle * Math.PI / 180)
            return {
              x: x1,
              y: y1
            }
          }

          function draw() {
            angle = angle + 3
            // 使用刚指定的配置项和数据显示图表。
            try {
              // 反应不过来就关掉动画
              _this.pingfen_jd_Echarts.hideLoading()
              _this.pingfen_jd_Echarts.setOption(option, true)
            } catch (e) {
              clearInterval(this.intervalFun)
            }
            _this.pingfen_jd_Echarts.resize()
          }

          if (timerId) {
            clearInterval(timerId)
          }
          if (this.intervalFun != '' && this.intervalFun != null && this.intervalFun != undefined) {
            clearInterval(this.intervalFun)
            this.intervalFun = setInterval(function() {
              //用setInterval做动画感觉有问题
              draw()
            }, 100)
          } else {
            this.intervalFun = setInterval(function() {
              //用setInterval做动画感觉有问题
              draw()
            }, 100)
          }
        }
      },
      setEchart2() {
        // 授权评分
        const echarts = this.$echarts
        if (!Object.keys(this.data2).length) {
          this.pingfenEcharts.setOption(this.$charts_setting.noDataOption, true)
        } else {
          let fenshu = this.data2.fenshu
          fenshu = 100
          let labelData = []
          let labelData1 = []
          // var typeText='沉睡软件软件';//沉睡软件|低频软件|正常软件|高频软件
          let typeText = this.data2.text//沉睡软件|低频软件|正常软件|高频软件
          for (var i = 0; i < 100; ++i) {
            labelData.push({
              value: 1,
              name: i,
              itemStyle: {
                normal: {
                  color: 'rgba(0,209,228,0)'
                }
              }
            })
          }
          for (var i = 0; i < labelData.length; ++i) {
            if (labelData[i].name < fenshu) {
              labelData[i].itemStyle = {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [{
                      offset: 0,
                      color: '#0ff'
                    },
                      {
                        offset: 1,
                        color: '#5467df'
                      }
                    ]
                  )
                }

              }
            }
          }
          for (var i = 0; i < 100; ++i) {
            labelData1.push({
              value: 1,
              name: i,
              itemStyle: {
                normal: {
                  color: 'rgba(0,209,228,0)'
                }
              }
            })
          }
          for (var i = 0; i < labelData1.length; ++i) {
            if (labelData1[i].name < 100) {
              labelData1[i].itemStyle = {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [{
                      offset: 0,
                      color: '#E3F0FF'
                    },
                      {
                        offset: 1,
                        color: '#E3F0FF'
                      }
                    ]
                  )
                }

              }
            }
          }
          var option = {
            title: [{
              text: typeText,
              x: '50%',
              y: '37%',
              textAlign: 'center',
              textStyle: {
                fontSize: '150%',
                fontWeight: 400,
                color: '#0FF',
                textAlign: 'center'
              }
            }, {
              text: '软件状态',
              left: '50%',
              top: '50%',
              textAlign: 'center',
              textStyle: {
                fontSize: '100%',
                fontWeight: '400',
                color: '#8d8793',
                textAlign: 'center'
              }
            }, {
              text: '评估',
              left: '50%',
              top: '60%',
              textAlign: 'center',
              textStyle: {
                fontSize: '100%',
                fontWeight: '400',
                color: 'rgba(65,63,112,1)',
                textAlign: 'center'
              }
            }],
            polar: {
              radius: ['80%', '75%'],
              center: ['50%', '50%']
            },
            angleAxis: {
              max: 100,
              show: false
            },
            radiusAxis: {
              type: 'category',
              show: true,
              axisLabel: {
                show: false
              },
              axisLine: {
                show: false

              },
              axisTick: {
                show: false
              }
            },
            series: [{
              name: '',
              type: 'bar',
              roundCap: true,
              barWidth: 60,
              showBackground: true,
              backgroundStyle: {
                color: '#2e2856'
              },
              data: [fenshu],
              coordinateSystem: 'polar',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: '#585fe1'
                  }, {
                    offset: 1,
                    color: '#0ff'
                  }])
                }
              }
            },
              {
                hoverAnimation: false,
                type: 'pie',
                z: 2,
                data: labelData,
                radius: ['55%', '65%'],
                zlevel: -2,
                itemStyle: {
                  normal: {
                    borderColor: '#E3F0FF',
                    borderWidth: 2
                  }
                },
                label: {
                  normal: {
                    position: 'inside',
                    show: false
                  }
                }
              },
              {
                hoverAnimation: false,
                type: 'pie',
                z: 1,
                data: labelData1,
                radius: ['55%', '65%'],
                zlevel: -2,
                itemStyle: {
                  normal: {
                    borderColor: '#E3F0FF',
                    borderWidth: 2
                  }
                },
                label: {
                  normal: {
                    position: 'inside',
                    show: false
                  }
                }
              }

            ]
          }

          // 使用刚指定的配置项和数据显示图表。
          this.pingfenEcharts.setOption(option, true)
          this.pingfenEcharts.resize()
        }
      },
      errFun(err) {
        this.pingfen_jd_Echarts.hideLoading()
        this.pingfenEcharts.hideLoading()
        let errInfo = this.$charts_setting.errOption(err)
        this.pingfen_jd_Echarts.setOption(errInfo, true)
        this.pingfenEcharts.setOption(errInfo, true)
      }
    }
  }
</script>

<style scoped>

</style>
