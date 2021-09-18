import { request } from '@/network'

export const treeChartTableAjax = {
  data() {
    return {
      treeChartTableAjax_data: []
    }
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
    treeChartTableAjax_fun(searchInfo) {
      request({
        /**修改url、ty、params传参*/
        url: '/Ashx/ISystemOverview.ashx',
        params: {
          ty: 'GetDepView_Portrait_Right',
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
          this.treeChartTableAjax_data = res.returndata
        } else {
        }
      })
    }
  }
}

