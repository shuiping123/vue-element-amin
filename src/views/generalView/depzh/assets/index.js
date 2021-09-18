import 'element-ui/lib/theme-chalk/display.css'
import { request } from '@/network'
import { downloadPDF } from '@/assets/js/htmlToPdf'

// 可复用
import SearchSelect from '@/components/SelectDown/SearchSelect'

// 此页面独享组件
import mingpian from './../component/mingpian'
import titleLst from './../component/titleLst'
import treeChart from './../component/treeChart'
import treeChartTable from './../component/treeChartTable'
import circlePieChart from './../component/circlePieChart'
import barLineTrend from './../component/barLineTrend'
import peakValueInfo from './../component/peakValueInfo'
import radarChartCard from './../component/radarChartCard'
import topForUsrAvgTime from './../component/topForUsrAvgTime'
import topForCs from './../component/topForCs'
import topForCountry from './../component/topForCountry'
import highAndSleepAppCard from './../component/highAndSleepAppCard'

// mixins
import { BasisInfoCard } from './../mixins/BasisInfoCard'
import { treeChartAjax } from './../mixins/treeChartAjax'
import { treeChartTableAjax } from './../mixins/treeChartTableAjax'
import { circlePieChartAjax } from './../mixins/circlePieChartAjax'
import { barLineTrendAjax } from './../mixins/barLineTrendAjax'
import { peakValueInfoAjax } from './../mixins/peakValueInfoAjax'
import { radarChartCardAjax } from './../mixins/radarChartCardAjax'
import { topsAjax } from './../mixins/topsAjax'
import { highAndSleepAppCardAjax } from './../mixins/highAndSleepAppCardAjax'

export default {
  name: 'depzh-view',
  components: {SearchSelect, mingpian, titleLst,
    treeChart, treeChartTable, circlePieChart,
    barLineTrend,peakValueInfo,radarChartCard,
    topForUsrAvgTime,topForCs,topForCountry,highAndSleepAppCard},
  mixins: [
    BasisInfoCard,//名片和六个块的数据
    treeChartAjax,//树形图
    treeChartTableAjax,//树形图的表格
    circlePieChartAjax,//软件授权占用时长分布 - 环形饼图
    barLineTrendAjax,//软件使用趋势，与环形饼图联动
    peakValueInfoAjax,//软件峰值详情 - 柱形图
    radarChartCardAjax,//综合应用分析 - 雷达图
    topsAjax,//top图:用户日均授权占用时长排行、软件来源厂商访问量排行、软件来源国维度访问量排行
    highAndSleepAppCardAjax,//高频和沉睡应用
  ],
  data() {
    return {
      // 查询条件 - 选中的参数
      searchInfo: {}
    }
  },
  methods: {
    DownPdf() {
      downloadPDF(this.$el, '部门维度洞察', 'item')
    },
    async searchLoad() {
      await this.getSearchData()
      // 执行的刷新函数
      this.getBasisInfo(this.searchInfo)
      this.treeChartAjax_fun(this.searchInfo)
      this.treeChartTableAjax_fun(this.searchInfo)
      this.circlePieChartAjax_fun(this.searchInfo)
      this.peakValueInfoAjax_fun(this.searchInfo)
      this.radarChartCardAjax_fun(this.searchInfo)
      this.topsAjax_fun(this.searchInfo)
    },
    getSearchData() {
      this.searchInfo = this.$refs.searchSelect.getSearchData()
    },
    /**软件授权占用时长分布  与  右侧趋势图的联动*/
    finishFun(data) {
      if (data) {
        if (data=='loading'){
          this.barLineTrendAjax_title='无数据';
          this.barLineTrendAjax_state=data;
          return false;
        }
        this.barLineTrendAjax_fun(this.searchInfo, data)
      }else {
        this.barLineTrendAjax_title='无数据';
        this.barLineTrendAjax_state='noData';
      }
    },
  }
}
