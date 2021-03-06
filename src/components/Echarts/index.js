import echarts from 'echarts'

// loading
export function showLoadingForEcharts(myChart) {
  myChart.showLoading({
    text: '数据正在加载...',
    textStyle: { fontSize: 30, color: '#444' },
    effectOption: { backgroundColor: 'rgba(0, 0, 0, 0)' }
  })
}

// 柱形图,同时把mychart给返回出来，以便于做修改
export function barFun(ID, myChart) {
  var dom = document.getElementById(ID)
  myChart = echarts.init(dom)

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
    myChart.setOption(option, true)
    myChart.hideLoading()
  }
  window.onresize = () => {
    myChart.resize()
  }
  return myChart
}
