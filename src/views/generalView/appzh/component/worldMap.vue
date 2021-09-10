<template>
  <card-box style="height: 330px;" :isfull="isFull">
    <div class="cardBoxTitle">
      <span>软件源厂商分布及对应指标</span>
      <fullscroll-tool :isfull.sync="isFull"/>
    </div>
     <div class="cardBoxContent" id="worldMap"/>
  </card-box>
</template>

<script>
  import { request } from '../../../../network'
  import {nameMap,worldInfoObj} from '@/assets/js/world-chinese'
  import 'echarts/map/js/world'
  import ResizeObserverPolyfill from 'resize-observer-polyfill';

  export default {
    name: 'worldMap',
    data(){
      return {
        myChart:null,
        isFull:false,
      }
    },
    mounted() {
      this.init();
    },
    methods:{
      init (){
        // 创建echarts对象
        if (!this.myChart)this.myChart=this.$echarts.init(document.getElementById('worldMap'));
        // 实例化对象 - 渲染
        this.myChart.setOption(_.cloneDeep(this.$charts_setting.noDataOption),true);
        // 绑定resize事件
        new ResizeObserverPolyfill(entries => {
          // 注意，entres是个数组，数组项为每个需要监听的DOM节点
          entries.forEach(entry => {
            this.myChart.resize();
          })
        }).observe(document.getElementById('worldMap'))
      },
      renderChart(searchInfo){
        this.myChart.showLoading(_.cloneDeep(this.$charts_setting.loadingOption),true);
        this.data=null;
        request({
          url: '/Ashx/ISystemOverview.ashx',
          params: {
            ty: 'GetAllSoftView_WorldMap_New',
            StartDate: searchInfo.StartDate,
            EndDate: searchInfo.EndDate,
            Is_Need_Count: searchInfo.Is_Need_Count
          }
        }).then(res => {
          this.myChart.hideLoading();
          if (res.returncode == 0) {
            let pArr= res.outdata2.map(item=>{
              return item.value;
            });
            this.$emit('updata_mapItem',pArr);
            let colorList=_.cloneDeep(this.$charts_setting.colorList)
            let tooltip=_.cloneDeep(this.$charts_setting.tooltipOption);
            let legend=_.cloneDeep(this.$charts_setting.legendOption);
            let label=_.cloneDeep(this.$charts_setting.labelOption);
            let xAxis=_.cloneDeep(this.$charts_setting.xAxisOption);
            let yAxis1=_.cloneDeep(this.$charts_setting.yAxisOption);
            let yAxis2=_.cloneDeep(this.$charts_setting.yAxisOption);
            let toolbox=_.cloneDeep(this.$charts_setting.toolboxOption);
            // legend.data=['授权并发数(个)', '来访用户数(人)', '日人均授权用时(时)']
            Object.assign(tooltip,{
              trigger: 'item',
              formatter: function (params) {
                if (params.data) {
                  return params.name + '<br/>关联厂商: ' + (params.data.value_2 ? params.data.value_2 : 0) + '个<br/>关联软件：' + (params.data.value_3 ? params.data.value_3 : 0) + '个<br/>关联用户：' + (params.value ? params.value : 0) + '人'

                }
                // return params.name+'<br/>关联厂商：'
              }
            })

            // Object.assign(xAxis,{
            //   type: 'category',
            //   data: xAxisArr,//方法1,
            // })
            var worldData = res.returndata;
            var barData = [
              '占关注软件来源国总数比例',
              '占关注软件源厂商总数比例',
              '占关注软件总数比例',
              '占用户总数比例',
            ];
            barData = res.outdata1.map(function (item, index) {
              item[3] = barData[index];
              return item;
            });





            // 加上经纬度信息
            worldData = worldData.map(function (item) {
              item.position = worldInfoObj[item.name];
              return item;
            });

            var worldArr = worldData.map(function (item, index) {
              item.itemStyle = {
                normal: {
                  color: colorList[index]
                }
              };
              return item
            });

            var worldGeoArr = worldData.map(function (item, index) {
              return {
                name: item.name,
                value: [
                  item.position[0], item.position[1], item.value
                ],
                itemStyle: {
                  normal: {
                    // color: 'red'
                    // color: '#ffa94c'
                    color: '#FFD87A'
                  }

                }
              }
            })


            var optionForText = '80%';
            var optionForLeft = '10%';//地图向右倾斜多少
            var zoomConfig = '1.25';//地图按照多少倍显示
            var yAxisData = [];
            var xAxisData = [];
            var graphic = [];// 右侧进度文字
            var gridData = [];
            var seriesData = [
              {
                // name: 'World Statistic',
                type: 'map',
                // show:false,
                mapType: 'world',
                nameMap: nameMap,
                // top: 'middle',
                // right: optionForLeft,
                // zoom: zoomConfig,
                left:0,
                right:'22%',
                top:0,
                bottom:0,
                // layoutCenter: ["35%", "50%"], //地图位置
                // layoutSize:'120%',
                // roam: true, //是否允许缩放
                // roam: false,
                itemStyle: {
                  normal: {
                    areaColor: '#B5CBD8',
                    borderColor: 'rgba(255,255,255,0.5)'
                  },
                  emphasis: {
                    areaColor: '#2B91B7',
                    label: {
                      show: false
                    }
                  }
                },
                data: worldArr
              },
              // 黄点的位置
              {
                // name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: worldGeoArr,
                tooltip: {
                  show: false
                },
                // roam: true, //是否允许缩放
                rippleEffect: {
                  //涟漪特效
                  period: 4, //动画时间，值越小速度越快
                  brushType: "stroke", //波纹绘制方式 stroke, fill
                  scale: 4 //波纹圆环最大限制，值越大波纹越大
                },
                label: {
                  normal: {
                    show: false,
                    position: "right", //显示位置
                    offset: [5, 0], //偏移设置
                    formatter: "{b}", //圆环显示文字
                    textStyle: {
                      color: "red"
                    }
                  },
                  emphasis: {
                    show: true
                  }
                },
                symbol: "circle",
                symbolSize: function (val) {
                  return 10; //圆环大小
                },
                itemStyle: {
                  normal: {
                    show: false
                  }
                },
                hoverAnimation: true,
                zlevel: 2,
              }
            ];
            barData.map(function (item, index) {
              yAxisData.push({
                type: 'category',
                show: false,
                position: "left",
                gridIndex: index,
                data: [item[2]]
              }, {
                type: 'category',
                show: false,
                position: "left",
                gridIndex: index,
                data: [item[2]]
              });
              xAxisData.push({
                type: 'value',
                show: false,
                gridIndex: index
              })
              graphic.push(
                // 显示的类目/名字
                {
                  type: 'text',
                  z: 100,
                  top: (100 / barData.length * (index + 1) - 100 / barData.length * 0.9) + '%',
                  left: optionForText,
                  style: {
                    fill: '#8A8A8A',
                    text: item[2],//Australia
                    font: '1em "Roboto", sans-serif',

                  }
                },
                // 实际的数值
                {
                  type: 'text',
                  z: 100,
                  top: (100 / barData.length * (index + 1) - 100 / barData.length * 0.7) + '%',
                  left: optionForText,
                  style: {
                    fill: '#000',
                    font: '1.1em "Roboto", sans-serif',
                    text: item[0],

                  }
                },
                // 下面的session的字
                {
                  type: 'text',
                  z: 100,
                  top: (100 / barData.length * (index + 1) - 100 / barData.length * 0.3) + '%',
                  left: optionForText,
                  style: {
                    fill: '#8A8A8A',
                    text: item[3],
                    font: '0.6em "Roboto", sans-serif',
                  }
                }
              );
              gridData.push({
                left: optionForText,
                right: '3%',
                // bottom: '82%',
                y: (100 / barData.length * (index + 1) - 100 / barData.length * 0.6) + '%',
                y2: (100 - 100 / barData.length * (index + 1) + (100 / barData.length * 0.2)) + '%',
                containLabel: false
              });
              seriesData.push(
                {
                  // name: 'C1',
                  type: 'bar',
                  barWidth: 5,
                  z: 0,
                  tooltip: {show: false},
                  xAxisIndex: index,
                  yAxisIndex: index * 2,
                  label: {
                    normal: {
                      show: true,
                      formatter: (item[0] / item[1] * 100).toFixed(1) + '%',
                      color: '#8A8A8A',
                      position: ['91%', '10']
                    },
                    emphasis: {
                      color: '#8A8A8A'
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#E7E7E7'
                    },
                    emphasis: {
                      color: '#E7E7E7',
                    }
                  },
                  data: [100]
                },
                {
                  // name: 'C2',
                  type: 'bar',
                  z: 1,
                  barWidth: 5,
                  tooltip: {show: false},
                  xAxisIndex: index,
                  yAxisIndex: index * 2 + 1,
                  label: {
                    normal: {
                      show: false,

                    }
                  },
                  itemStyle: {
                    normal: {
                      color: colorList[index]
                    },
                    emphasis: {
                      color: colorList[index]
                    }
                  },
                  data: [parseInt(item[0] / item[1] * 100)]
                })
            });


            var option = {
              grid: gridData,
              xAxis: xAxisData,
              yAxis: yAxisData,
              graphic: graphic,
              tooltip,
              geo: {
                map: 'world',
                left:0,
                right:'22%',
                top:0,
                bottom:0,
                // layoutCenter: ["35%", "50%"], //地图位置
                // layoutSize:'120%',
                // zoom: zoomConfig,
                label: {
                  emphasis: {
                    show: false
                  }
                },

              },
              series: seriesData
            }

            // 使用刚指定的配置项和数据显示图表。
            this.myChart.setOption(option,true);
          }else {
            this.myChart.setOption(this.$charts_setting.errOption(res.returnmsg),true)
          }
          this.myChart.resize();
        })
      },
    }
  }
</script>

<style scoped>

</style>
