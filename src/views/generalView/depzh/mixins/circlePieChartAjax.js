import { request } from '@/network'

export const circlePieChartAjax = {
  data() {
    return {
      /**echart树形图的数据*/
      circlePieChartAjax_state: 'noData',
      circlePieChartAjax_data: []
    }
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
    circlePieChartAjax_fun(searchInfo) {
      this.circlePieChartAjax_state = 'loading'
      request({
        /**修改url、ty、params传参*/
        url: '/Ashx/ISystemOverview.ashx',
        params: {
          ty: 'GetDepView_TokenHourZy',
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
          this.circlePieChartAjax_state = 'render'
          this.circlePieChartAjax_data = res.returndata
        } else {
          /**报错信息是否正确*/
          this.circlePieChartAjax_state = 'err'
          this.circlePieChartAjax_data = res.returnmsg
        }
      })
    }
  }
}

