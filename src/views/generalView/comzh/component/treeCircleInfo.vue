<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="12" :lg="12">
      <div class="cardBoxItem">
        <el-card shadow="hover">
          <card-box style="height: 400px;" :isfull="isFull">
            <div class="cardBoxTitle">
              <span>公司软件关联关系洞察</span>
              <fullscroll-tool :isfull.sync="isFull"/>
            </div>
            <div class="cardBoxContent" ref="com_tree_circle"/>
          </card-box>
        </el-card>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12">
      <div class="cardBoxItem comTableInfo_dep_com">
        <el-card shadow="hover" style="position: relative">
          <div style="position: absolute;right: 25px;top: 25px;width:100%;z-index: 2">
            <down-excel-tool @downExcel="downExcel"/>
          </div>
          <div>
            <el-tabs v-model="activeName">
              <el-tab-pane label="辖下部门软件使用详情" name="first">
                <el-table :data="tableData_dep" height="340" style="width: 100%">
                  <el-table-column type="expand" width="15">
                    <template slot-scope="scope">
                      <el-table :data="scope.row.children" :show-header="false" style="width: 100%">
                        <el-table-column  label="" width="15"/>
                        <el-table-column label="部门" width="90"/>
                        <el-table-column label="软件">
                          <template slot-scope="scope">{{scope.row.name}}</template>
                        </el-table-column>
                        <el-table-column label="用户数" width="80">
                          <template slot-scope="scope">{{scope.row.num}}人</template>
                        </el-table-column>
                        <el-table-column label="授权占用时长" width="120">
                          <template slot-scope="scope">{{scope.row.time}}时/人</template>
                        </el-table-column>
                      </el-table>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="部门" width="90">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                  </el-table-column>
                  <el-table-column label="软件数">
                    <template slot-scope="scope">{{scope.row.generalSQ}}个</template>
                  </el-table-column>
                  <el-table-column label="用户数" width="80">
                    <template slot-scope="scope">{{scope.row.num}}人</template>
                  </el-table-column>
                  <el-table-column label="授权占用时长" width="120">
                    <template slot-scope="scope">{{scope.row.time}}时/人</template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="辖下一级公司软件使用详情" name="second">
                <el-table :data="tableData_com" height="340" style="width: 100%">
                  <el-table-column type="expand" width="15">
                    <template slot-scope="scope">
                      <el-table :data="scope.row.children" :show-header="false" style="width: 100%">
                        <el-table-column  label="" width="15"/>
                        <el-table-column label="部门" width="90"/>
                        <el-table-column label="软件">
                          <template slot-scope="scope">{{scope.row.name}}</template>
                        </el-table-column>
                        <el-table-column label="用户数" width="80">
                          <template slot-scope="scope">{{scope.row.num}}人</template>
                        </el-table-column>
                        <el-table-column label="授权占用时长" width="120">
                          <template slot-scope="scope">{{scope.row.time}}时/人</template>
                        </el-table-column>
                      </el-table>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="部门" width="90">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                  </el-table-column>
                  <el-table-column label="软件数">
                    <template slot-scope="scope">{{scope.row.generalSQ}}个</template>
                  </el-table-column>
                  <el-table-column label="用户数" width="80">
                    <template slot-scope="scope">{{scope.row.num}}人</template>
                  </el-table-column>
                  <el-table-column label="授权占用时长" width="120">
                    <template slot-scope="scope">{{scope.row.time}}时/人</template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import {request} from '../../../../network'
  import ResizeObserverPolyfill from 'resize-observer-polyfill';
  export default {
    name: 'treeCircleInfo',
    data(){
      return {
        isFull:false,//是否全屏
        myChart:null,//echarts实例对象
        activeName:'first', //tab选择的第几个
        // 部门 table
        tableData_dep:[],
        // 公司 table
        tableData_com:[],
      }
    },
    mounted() {
      this.init();
    },
    methods:{
      init() {
        let dom=this.$refs.com_tree_circle;
        // 创建echarts对象
        if (!this.myChart) this.myChart = this.$echarts.init(dom)
        // 渲染echarts图表 - 暂无数据的提示
        this.myChart.setOption(this.$charts_setting.noDataOption, true)
        // 绑定resize函数
        new ResizeObserverPolyfill(entries => {
          // 注意，entres是个数组，数组项为每个需要监听的DOM节点
          entries.forEach(entry => {
            this.myChart.resize();
          })
        }).observe(dom)
      },
      renderChart(searchInfo) {
        this.myChart.showLoading(_.cloneDeep(this.$charts_setting.loadingOption),true);
        request({
          url: '/Ashx/ISystemOverview.ashx',
          params: {
            ty: 'GetComView_IISA',
            StartDate: searchInfo.StartDate,
            EndDate: searchInfo.EndDate,
            ComId: searchInfo.ComId.join(','),
            DepId: searchInfo.DepId.join(','),
            ComFamId: searchInfo.ComFamId.join(','),
            BaokouAllChildComId: searchInfo.BaokouAllChildComId,
            Is_Need_Count: searchInfo.Is_Need_Count
          }
        }).then(res => {
          this.myChart.hideLoading();
          if (res.returncode == 0) {
            this.tableData_dep = res.outdata1;
            this.tableData_com = res.outdata2;

            let tooltip = _.cloneDeep(this.$charts_setting.tooltipOption)
            let legend = _.cloneDeep(this.$charts_setting.legendOption)
            let label = _.cloneDeep(this.$charts_setting.labelOption)
            colors = _.cloneDeep(this.$charts_setting.colorList)
            var getdata = function getData() {
              let arr = []
              arr.push(res.returndata)
              arr = handle(arr, 0, colors)
              return arr
            }
            let option;
            if (res.returndata.children.length!=0) {
              option = {
                title: {
                  text: ''
                },
                type: 'tree',
                // backgroundColor: "#000",
                tooltip,
                series: [{
                  name: '有效工作用时（时）',
                  type: 'tree',
                  hoverAnimation: true, //hover样式
                  data: getdata(),
                  top: 30,
                  bottom: 30,
                  left: 0,
                  right: 0,
                  layout: 'radial',
                  symbol: 'circle',
                  symbolSize: 10,
                  nodePadding: 20,
                  animationDurationUpdate: 750,
                  expandAndCollapse: true, //子树折叠和展开的交互，默认打开
                  initialTreeDepth: 2,//显示到第几级树
                  roam: true, //是否开启鼠标缩放和平移漫游。scale/move/true
                  focusNodeAdjacency: true,
                  itemStyle: {
                    borderWidth: 1
                  },
                  label,
                  lineStyle: {
                    width: 1,
                    curveness: 0.5
                  }
                }]
              }
            } else {
              option = _.cloneDeep(this.$charts_setting.noDataOption)
            }
            this.myChart.setOption(option, true)
          }  else {
            this.myChart.setOption(this.$charts_setting.errOption(res.returnmsg),true)
          }
        })

      },
      downExcel(){
        let data1={
          name:'辖下部门软件使用详情',
          data:[['部门','软件','用户数(人)','授权占用时长(时/人)']]
        }
        this.tableData_dep.map(item_dep=>{
          data1.data.push([
            item_dep.name,
            item_dep.generalSQ+'个',
            item_dep.num,
            item_dep.time
          ])
          item_dep.children.map(item=>{
            data1.data.push(['',item.name,item.num,item.time])
          })
        })
        let data2={
          name:'辖下一级软件使用详情',
          data:[['部门','软件','用户数(人)','授权占用时长(时/人)']]
        }
        this.tableData_com.map(item_com=>{
          data2.data.push([
            item_com.name,
            item_com.generalSQ+'个',
            item_com.num,
            item_com.time
          ])
          item_com.children.map(item=>{
            data2.data.push(['',item.name,item.num,item.time])
          })
        })
        this.$current.exportExcel('公司软件使用情况',data1,data2)
      }
    },
  }
  let colors
  let color = '#00f6ff'

  function handle(data, index) {
    //index标识第几层
    return data.map(function(item, index2) {
      //计算出颜色
      if (index == 1) {
        color = colors.find(function(item, eq) {
          return eq == index2 % 10
        })
      }
      // 设置节点大小
      if (index === 0 || index === 1) {
        item.label = {
          position: 'inside'
          //   rotate: 0,
          //   borderRadius: "50%",
        }
      }
      // 设置label大小
      switch (index) {
        case 0:
          item.symbolSize = 70
          break
        case 1:
          item.symbolSize = 50
          break
        default:
          item.symbolSize = 10
          break
      }
      // 设置线条颜色
      item.lineStyle = {
        color: color
      }

      if (item.children) { //存在子节点
        item.itemStyle = {
          borderColor: color,
          color: color
        }
        item.children = handle(item.children, index + 1, color)
      } else { //不存在
        item.itemStyle = {
          color: 'transparent',
          borderColor: color
        }
      }
      return item
    })
  }
</script>

<style>
.comTableInfo_dep_com .el-table__expanded-cell{
  padding:0!important;
}
</style>
