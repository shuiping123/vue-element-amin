import { request } from '@/network'

export const radarChartCardAjax = {
  data() {
    return {
      /**echart树形图的数据*/
      radarChartCardAjax_state: 'noData',
      radarChartCardAjax_data: {}
    }
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
    radarChartCardAjax_fun(searchInfo) {
      this.radarChartCardAjax_state = 'loading'
      request({
        /**修改url、ty、params传参*/
        url: '/Ashx/ISystemOverview.ashx',
        params: {
          ty: 'GetDepView_Analysis',
          StartDate: searchInfo.StartDate,
          EndDate: searchInfo.EndDate,
          ComId: searchInfo.ComId.join(','),
          DepId: searchInfo.DepId.join(','),
          UsrId: searchInfo.UsrId.join(','),
          ComFamId: searchInfo.ComFamId.join(','),
          BaokouAllChildComId: searchInfo.BaokouAllChildComId,
          Is_Need_Count: searchInfo.Is_Need_Count
        }
      }).then(res => {
        if (res.returncode == 0) {
          /**修改值是否正确*/
          this.radarChartCardAjax_state = 'render'
          this.radarChartCardAjax_data = {
            name:'软件综合分析',
            data:res.outdata1,
            indicator:res.returndata,
          }
        } else {
          /**报错信息是否正确*/
          this.radarChartCardAjax_state = 'err'
          this.radarChartCardAjax_data = res.returnmsg
        }
      })
    }
  }
}

