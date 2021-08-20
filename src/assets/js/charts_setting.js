const config={
  // 颜色色列
  colorList1:['#62BB46', '#479bf3', '#f68c34',
    '#7758da', '#52b57e', '#e14a51',
    '#4672db', '#FF9800', '#1F77B4',
    '#CDDC39', '#9C27B0', '#785549',
    '#FFBB78', '#002A46', '#ADFF2F',
    '#E35200', '#29AAE3', '#FFD700',
    '#737373', '#E066FF', '#BFBFBF',
    '#7FFF00'],
  colorList2:['#0e72cc', '#6ca30f', '#f59311',
    '#fa4343', '#16afcc', '#85c021',
    '#d12a6a', '#0e72cc', '#6ca30f',
    '#f59311', '#fa4343', '#16afcc',
    '#62BB46', '#479bf3', '#f68c34',
    '#7758da', '#52b57e', '#e14a51',
    '#4672db', '#FF9800', '#1F77B4',
    '#CDDC39'],
  colorList3:['#05f8d6', '#0082fc', '#fdd845',
    '#22ed7c', '#09b0d3', '#1d27c9',
    '#f9e264', '#f47a75', '#009db2',
    '#024b51', '#0780cf', '#765005',
    '#62BB46', '#479bf3', '#f68c34',
    '#7758da', '#52b57e', '#e14a51',
    '#4672db', '#FF9800', '#1F77B4',
    '#CDDC39'],
  colorList4:['#e75840', '#a565ef', '#628cee',
    '#eb9358', '#d05c7c', '#bb60b2',
    '#433e7c', '#f47a75', '#009db2',
    '#024b51', '#0780cf', '#765005',
    '#62BB46', '#479bf3', '#f68c34',
    '#7758da', '#52b57e', '#e14a51',
    '#4672db', '#FF9800', '#1F77B4',
    '#CDDC39'],
  colorList:['#2ec7c9', '#b6a2de', '#5ab1ef',
    '#ffb980', '#d87a80', '#8d98b3',
    '#e5cf0d', '#97b552', '#95706d',
    '#dc69aa', '#07a2a4', '#9a7fd1',
    '#588dd5', '#f5994e', '#c05050',
    '#59678c', '#c9ab00', '#7eb00a',
    '#6f5553', '#c14089',
  ],
  // 暂无数据显示
  noDataOption:{
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
  loadingOption:{
    text: '数据正在加载...',
    color: '#65ABE7',
    textColor: '#65ABE7',
    maskColor: 'rgba(255, 255, 255, 0.8)',
    fontSize: '16px',
    effectOption: { backgroundColor: 'rgba(0, 0, 0, 0)' }
  },
  // 显示错误信息
  errOption(err){
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
    };
  },

  // 图标样式相关
  legendOption:{
    show: true,
    left: 'center',
    type: 'scroll',
    textStyle:{
      color:'#333',
      fontSize:15
    }
  },
  tooltipOption:{
    trigger: 'item',
    // backgroundColor:'#fff',
    backgroundColor:'rgba(255,255,255,0.7)',
    extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',//额外附加到浮层的css样式 - 浮层添加阴影
    borderColor:'#333',
    borderWidth:0,
    textStyle:{
      color:'#000',
      fontSize:14,
    }
  },
  labelOption:{ //标签样式
    color: '#000',
    fontSize: 16,
    fontFamily: 'SourceHanSansCN'
    // position: "inside",//控制文字位置
    // rotate: 0,//控制倾斜程度
    // show: true
  },
  radarLabelName:{ //标签样式
    color: '#C0C4CC',
    fontSize: 16,
    fontFamily: 'SourceHanSansCN'
  },
  xAxisOption:{},
  yAxisOption:{},
  lineOption:{},
  barOption:{},
  timelineOption: {
    axisType: 'category',
    autoPlay: false,
    playInterval: 1000,
    label: {
      show: false
    }
  },
  toolboxOption: {
    show: true,
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      dataView: {readOnly: false},
      magicType: {type: ['line', 'bar']},
      restore: {},
      saveAsImage: {}
    }
  },
}

export default {
  config
}
