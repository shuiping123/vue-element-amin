const config = {
  // 颜色色列
  colorList1: ['#62BB46', '#479bf3', '#f68c34',
    '#7758da', '#52b57e', '#e14a51',
    '#4672db', '#FF9800', '#1F77B4',
    '#CDDC39', '#9C27B0', '#785549',
    '#FFBB78', '#002A46', '#ADFF2F',
    '#E35200', '#29AAE3', '#FFD700',
    '#737373', '#E066FF', '#BFBFBF',
    '#7FFF00'],
  colorList2: ['#0e72cc', '#6ca30f', '#f59311',
    '#fa4343', '#16afcc', '#85c021',
    '#d12a6a', '#0e72cc', '#6ca30f',
    '#f59311', '#fa4343', '#16afcc',
    '#62BB46', '#479bf3', '#f68c34',
    '#7758da', '#52b57e', '#e14a51',
    '#4672db', '#FF9800', '#1F77B4',
    '#CDDC39'],
  colorList3: ['#05f8d6', '#0082fc', '#fdd845',
    '#22ed7c', '#09b0d3', '#1d27c9',
    '#f9e264', '#f47a75', '#009db2',
    '#024b51', '#0780cf', '#765005',
    '#62BB46', '#479bf3', '#f68c34',
    '#7758da', '#52b57e', '#e14a51',
    '#4672db', '#FF9800', '#1F77B4',
    '#CDDC39'],
  colorList4: ['#e75840', '#a565ef', '#628cee',
    '#eb9358', '#d05c7c', '#bb60b2',
    '#433e7c', '#f47a75', '#009db2',
    '#024b51', '#0780cf', '#765005',
    '#62BB46', '#479bf3', '#f68c34',
    '#7758da', '#52b57e', '#e14a51',
    '#4672db', '#FF9800', '#1F77B4',
    '#CDDC39'],
  colorList: ['#2ec7c9', '#b6a2de', '#5ab1ef',
    '#ffb980', '#d87a80', '#8d98b3',
    '#e5cf0d', '#97b552', '#95706d',
    '#dc69aa', '#07a2a4', '#9a7fd1',
    '#588dd5', '#f5994e', '#c05050',
    '#59678c', '#c9ab00', '#7eb00a',
    '#6f5553', '#c14089'
  ],
  // 暂无数据显示
  noDataOption: {
    title: {
      text: '暂无数据',
      x: 'center',
      y: 'center',
      textStyle: {
        color: '#65ABE7',
        fontWeight: 'normal',
        fontSize: 16
      }
    }
  },
  // 显示loading
  loadingOption: {
    text: '数据正在加载...',
    color: '#65ABE7',
    textColor: '#65ABE7',
    maskColor: 'rgba(255, 255, 255, 0.8)',
    fontSize: '16px',
    effectOption: { backgroundColor: 'rgba(0, 0, 0, 0)' }
  },
  // 显示错误信息
  errOption(err) {
    return {
      title: {
        text: err,//获取后需要在这里写入错误信息
        x: 'center',
        y: 'center',
        textStyle: {
          color: '#65ABE7',
          fontWeight: 'normal',
          fontSize: 16
        }
      }
    }
  },
  // 图标样式相关
  legendOption: {
    show: true,
    left: 'center',
    type: 'scroll',
    textStyle: {
      color: '#333',
      fontSize: 14
    }
  },
  tooltipOption: {
    trigger: 'item',
    // backgroundColor:'#fff',
    backgroundColor: 'rgba(255,255,255,0.7)',
    extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',//额外附加到浮层的css样式 - 浮层添加阴影
    borderColor: '#333',
    borderWidth: 0,
    textStyle: {
      color: '#000',
      fontSize: 14
    }
  },
  labelOption: { //标签样式
    color: '#000',
    fontSize: 12,
    fontFamily: 'SourceHanSansCN'
    // position: "inside",//控制文字位置
    // rotate: 0,//控制倾斜程度
    // show: true
  },
  radarLabelName: { //标签样式
    color: '#C0C4CC',
    fontSize: 14,
    fontFamily: 'SourceHanSansCN'
  },
  xAxisOption: {
    axisLabel:{
      fontSize:14
    }
  },
  yAxisOption: {
    axisLabel:{
      fontSize:14
    }
  },
  lineOption: {
    type:'line',
    symbolSize: 1,
    smooth: true,
    animation: true,
  },
  barOption: {
    type:'bar',
    barGap: 0,
    barMaxWidth: 30,
  },
  timelineOption: {
    axisType: 'category',
    autoPlay: false,
    playInterval: 1000,
    label: {
      show: false
    }
  },
  toolboxOption: {
    show: false,
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {}
    }
  },
  treeOptions: {
    lineStyle: {
      // 线宽
      // width: 3
    },
    /** 树形图 - 节点的样式 */
    symbolSize: 12,
    symbol: 'circle',
    itemStyle: {
      color: '#2ec7c9',
      borderColor: '#2ec7c9'
    }
  },
  dataZoomOption: {
    type: 'slider',
    // maxValueSpan: 7,
    xAxisIndex: 0,
    height: 20,
    start: 0,
    end: 100,
    bottom: 0,
  },
  // 仪表盘样式进度条
  dashboardOption:{
    title:{
      // 其余属性默认使用全局文本样式，详见TEXTSTYLE
      x: 'center',
      // y: 'bottom',
      bottom: 20,
      fontSize: 5,
      fontStyle: 'italic'
    },
    seriesOption(name,title,dataVal,max){
      var colorSet = {
        color:'#2ec7c9'
      }
      let arr=[
        {
          name: name,
          type: 'gauge',
          center: ['50%', '45%'],
          radius: '40%',
          axisLine: {
            lineStyle: {
              color: [
                [dataVal / max, colorSet.color],
                [1, '#e3f0ff']
              ],
              width: 8
            }
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false

          },
          splitLine: {
            show: false
          },
          detail: {
            formatter: function(value) {
              // if (value !== 0) {
              //     var num = value;
              // var num = Math.round(value);
              // return parseInt(num/10).toFixed(0) + "";
              return dataVal
              // } else {
              //     return 0;
              // }
            },
            offsetCenter: [0, 82],
            textStyle: {
              padding: [0, 0, 0, 0],
              fontSize: 18,
              fontWeight: '700',
              color: '#555555'
            }
          },
          title: { //标题
            show: false,
            offsetCenter: [0, 46], // x, y，单位px
            textStyle: {
              color: '#fff',
              fontSize: 14, //表盘上的标题文字大小
              fontWeight: 400,
              fontFamily: 'PingFangSC'
            }
          },
          data: [{
            name: title,
            value: 100 / max * dataVal
          }],
          itemStyle: {
            color: colorSet.color,
            show: false
          },
          pointer: {
            show: true,
            length: '75%',
            radius: '20%',
            width: 4 //指针粗细
          },
          animationDuration: 4000
        },
        {
          name: '外部刻度',
          type: 'gauge',
          center: ['50%', '45%'],
          radius: '60%',
          min: 0, //最小刻度
          max: max, //最大刻度
          splitNumber: 10, //刻度数量
          startAngle: 225,
          endAngle: -45,
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: [
                [1, 'rgba(0,0,0,0)']
              ]
            }
          }, //仪表盘轴线
          axisLabel: {
            show: true,
            color: colorSet.color,
            distance: 25,
            formatter: function(v) {
              switch (v) {
                case 0:
                  return '0'
                case (max * 0.1):
                  return ''
                case (max * 0.2):
                  return ''
                case (max * 0.3):
                  return ''
                case (max * 0.4):
                  return ''
                case (max * 0.5):
                  return max / 2
                case (max * 0.6):
                  return ''
                case (max * 0.7):
                  return ''
                case (max * 0.8):
                  return ''
                case (max * 0.9):
                  return ''
                case max:
                  return max
              }
            }
          }, //刻度标签。
          axisTick: {
            show: true,
            splitNumber: 7,
            lineStyle: {
              color: colorSet.color, //用颜色渐变函数不起作用
              width: 1
            },
            length: -8
          }, //刻度样式
          splitLine: {
            show: true,
            length: -20,
            lineStyle: {
              color: colorSet.color //用颜色渐变函数不起作用
            }
          }, //分隔线样式
          detail: {
            show: false
          },
          pointer: {
            show: false
          }
        }
      ];

      return arr;
    }
  },
  /**词云图设置*/
  wordCloudOption(data){
    return {
      type: 'wordCloud',
      gridSize: 20,
      sizeRange: [12, 50],
      rotationRange: [0, 0],
      shape: 'circle',
      textStyle: {
        normal: {
          color: function (params) {
            let r = 20 + ~~(Math.random() * 100);
            let g = 135 + ~~(Math.random() * 100);
            let b = 135 + ~~(Math.random() * 100);
            return 'rgb('+r+','+g+', '+b+')'
          }
        },
        emphasis: {
          shadowBlur: 1,
          shadowColor: '#333'
        }
      },
      data: data
    }
  }
}

export default {
  config
}
