<template>
    <div class="treePie chartDiv"></div>
</template>

<script>
  export default {
    name: 'treePie',
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      data,
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
          _this.myChart.showLoading({
            text: '数据正在加载...',
            textStyle: { fontSize: 30, color: '#444' },
            effectOption: { backgroundColor: 'rgba(0, 0, 0, 0)' }
          })
          return false
        }


        var colors = this.$store.state.colorList;
        var getdata = function getData() {
          let arr = []
          // arr.push(response.returndata)
          arr.push(_this.data)
          //
          arr = handle(arr, 0)
          return arr;
        };

        var color = '#00f6ff';

        function handle(data, index) {
          // function handle(data, index, color = '#00f6ff') {
          //index标识第几层
          return data.map(function (item, index2) {
            //计算出颜色
            if (index == 1) {
              color = colors.find(function (item, eq) {
                return eq == index2 % 10
              });
            }
            // 设置节点大小
            if (index === 0 || index === 1) {
              item.label = {
                position: "inside",
                //   rotate: 0,
                //   borderRadius: "50%",
              }
            }
            // 设置label大小
            switch (index) {
              case 0:
                item.symbolSize = 70;
                break;
              case 1:
                item.symbolSize = 50;
                break;
              default:
                item.symbolSize = 10;
                break;
            }
            // 设置线条颜色
            item.lineStyle = {
              color: color
            }

            if (item.children) { //存在子节点
              item.itemStyle = {
                borderColor: color,
                color: color
                // color: colorRgba(color,0.8)
              };
              item.children = handle(item.children, index + 1, color)
            } else { //不存在
              item.itemStyle = {
                color: 'transparent',
                borderColor: color
              };
            }
            return item
          })
        };


        var option = {
          type: "tree",
          // backgroundColor: "#000",
          tooltip: { //提示框
            trigger: "item",
          },
          series: [{
            // name: '有效工作用时（时）',
            type: "tree",
            hoverAnimation: true, //hover样式
            data: getdata(),
            top: 30,
            bottom: 30,
            left: 0,
            right: 0,
            layout: "radial",
            symbol: "circle",
            symbolSize: 10,
            nodePadding: 20,
            animationDurationUpdate: 750,
            expandAndCollapse: true, //子树折叠和展开的交互，默认打开
            initialTreeDepth: 2,//显示到第几级树
            roam: true, //是否开启鼠标缩放和平移漫游。scale/move/true
            focusNodeAdjacency: true,
            itemStyle: {
              borderWidth: 1,
            },
            label: { //标签样式
              color: "#000",
              fontSize: 10,
              fontFamily: "SourceHanSansCN",
              // position: "inside",//控制文字位置
              // rotate: 0,//控制倾斜程度
              // show: true
            },
            lineStyle: {
              width: 1,
              curveness: 0.5,
            }
          }]
        };



        if (option && typeof option === 'object') {
          _this.myChart.setOption(option, true)
          _this.myChart.hideLoading()
        }
        window.onresize = () => {
          _this.myChart.resize()
        }

        // 树形图点击用户跳转
        _this.myChart.on('click', function (params) {
          if (params.data.children.length == 0 && params.data.Myid != 0) {

            // window.location.href = ;
          }
        });

      }
    }
  }
</script>
<style>

</style>
