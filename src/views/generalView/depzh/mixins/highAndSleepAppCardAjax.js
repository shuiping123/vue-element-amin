import { request } from '@/network'

export const highAndSleepAppCardAjax = {
  data() {
    return {
      /**echart树形图的数据*/
      highAndSleepAppCardAjax_state: 'noData',
      highAndSleepAppCardAjax_data: []
    }
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
    highAndSleepAppCardAjax_fun(searchInfo) {
      this.highAndSleepAppCardAjax_state = 'loading'
      request({
        /**修改url、ty、params传参*/
        url: '/Ashx/ISystemOverview.ashx',
        params: {
          ty: 'GetDepView_HighPc',
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
          this.highAndSleepAppCardAjax_state = 'render'
          this.highAndSleepAppCardAjax_data = res
        } else {
          /**报错信息是否正确*/
          this.highAndSleepAppCardAjax_state = 'err'
          this.highAndSleepAppCardAjax_data = res.returnmsg
        }
      })
    }
  }
}

