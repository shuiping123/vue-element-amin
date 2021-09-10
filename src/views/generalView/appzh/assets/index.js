import 'element-ui/lib/theme-chalk/display.css'
import { request } from '@/network'
import {downloadPDF} from '@/assets/js/htmlToPdf'

// 可复用
import SearchSelect from '@/components/SelectDown/SearchSelect'


// 此页面独享
import worldMap from '@/views/generalView/appzh/component/worldMap'
import mapItem from '@/views/generalView/appzh/component/mapItem'
import warringDiv from '@/views/generalView/appzh/component/warringDiv'
import radarChartDiv from '@/views/generalView/appzh/component/radarChartDiv'
import treeChart from '@/views/generalView/appzh/component/treeChart'
import peakValue from '@/views/generalView/appzh/component/peakValue'

export default {
  name: 'appzh-view',
  data() {
    return {
      // 查询条件 - 选中的参数
      searchInfo: {},
      mapItem:[0,0,0,0]
    }
  },
  components: {SearchSelect,worldMap,mapItem,warringDiv,radarChartDiv,treeChart,peakValue},
  methods: {
    DownPdf(){
      downloadPDF(this.$el,'软件需求分析')
    },


    // 超长用时导出excel
    downExcel_longTimeLst(){
      let data={
        name:'超长用时记录',
        data:[['序号','用户','日期']]
      }
      this.longTimeLst.map((item,key)=>{
        data.data.push([key+1,item.UsrName,item.StartDatetime])
      })
      this.$current.exportExcel(data.name,data);
    },
    // 子版本访问量分布(辖下一级组织层级)
    downExcel_piepiepie(){
      this.$refs.piepiepie.downExcel()
    },
    getSearchData() {
      this.searchInfo = this.$refs.searchSelect.getSearchData()
    },
    async searchLoad() {
      await this.getSearchData()
      // 地图 - 及地图下方数据
      this.$refs.worldmap.renderChart(this.searchInfo);
      // 软件预警数据
      this.$refs.warringDiv.renderFun(this.searchInfo);
      // 软件综合分析
      this.$refs.radarChart_appszh.renderChart(this.searchInfo);
      // 关注软件资产分布
      this.$refs.treeChart_appszh.renderChart(this.searchInfo);
      // 软件峰值及访问量详情
      this.$refs.peakValue_appszh.renderChart(this.searchInfo);
    },
    // 更新地图下方的数据
    updata_mapItem(data){
      this.mapItem=data;
    },
  }
}
