import 'element-ui/lib/theme-chalk/display.css'
import { request } from '@/network'
import {downloadPDF} from '@/assets/js/htmlToPdf'

// 可复用
import SearchSelect from '@/components/SelectDown/SearchSelect'

// 此页面独享
import infoCard from './../component/infoCard'
import treeCircleInfo from './../component/treeCircleInfo'
import emptyCirclePie from './../component/emptyCirclePie'
import radarDiv from './../component/radarDiv'
import hexuDiv from './../component/hexuDiv'
import topsRowDiv from './../component/topsRowDiv'
import peakValueTop from './../component/peakValueTop'
import mijiWork from './../component/mijiWork'
import topAndWarning from './../component/topAndWarning'

export default {
  name: 'comzh-view',
  components: { SearchSelect, infoCard,treeCircleInfo,emptyCirclePie,radarDiv,hexuDiv,topsRowDiv,peakValueTop,
    mijiWork,topAndWarning },
  data() {
    return {
      // 查询条件 - 选中的参数
      searchInfo: {},
    }
  },
  methods: {
    DownPdf(){
      downloadPDF(this.$el,'公司维度洞察')
    },
    async searchLoad() {
      await this.getSearchData()
      // 执行的刷新函数
      this.$refs.infoCard.renderFun(this.searchInfo)
      this.$refs.treeCircleInfo.renderChart(this.searchInfo)
      this.$refs.emptyCirclePie.renderChart(this.searchInfo)
      this.$refs.radarDiv.renderChart(this.searchInfo)
      this.$refs.hexuDiv.renderChart(this.searchInfo)
      this.$refs.topsRowDiv.renderChart(this.searchInfo)
      this.$refs.peakValueTop.renderChart(this.searchInfo)
      this.$refs.mijiWork.renderChart(this.searchInfo)
      this.$refs.topAndWarning.renderFun(this.searchInfo)
    },
    getSearchData() {
      this.searchInfo = this.$refs.searchSelect.getSearchData()
    },
  }
}
