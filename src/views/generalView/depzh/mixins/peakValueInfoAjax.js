import { request } from '@/network'

export const peakValueInfoAjax = {
  data() {
    return {
      /**echart树形图的数据*/
      peakValueInfoAjax_state: 'noData',
      peakValueInfoAjax_data: []
    }
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
    peakValueInfoAjax_fun(searchInfo) {
      this.peakValueInfoAjax_state = 'loading'
      request({
        /**修改url、ty、params传参*/
        url: '/Ashx/ISystemOverview.ashx',
        params: {
          ty: 'GetDepView_AppTokenFzXq',
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
          this.peakValueInfoAjax_state = 'render'
          this.peakValueInfoAjax_data = res.returndata
        } else {
          /**报错信息是否正确*/
          this.peakValueInfoAjax_state = 'err'
          this.peakValueInfoAjax_data = res.returnmsg
        }
      })
    }
  }
}

