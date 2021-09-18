import { request } from '@/network'

export const barLineTrendAjax = {
  data() {
    return {
      /**echart树形图的数据*/
      barLineTrendAjax_state: 'noData',
      barLineTrendAjax_data: [],
      barLineTrendAjax_title: '软件使用趋势',
    }
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
    barLineTrendAjax_fun(searchInfo,data) {
      this.barLineTrendAjax_state = 'loading'
      request({
        /**修改url、ty、params传参*/
        url: '/Ashx/ISystemOverview.ashx',
        params: {
          ty: 'GetDepView_AppUseQs',
          StartDate: searchInfo.StartDate,
          EndDate: searchInfo.EndDate,
          ComId: searchInfo.ComId.join(','),
          DepId: searchInfo.DepId.join(','),
          UsrId: searchInfo.UsrId.join(','),
          ComFamId: data.id,
          BaokouAllChildComId: searchInfo.BaokouAllChildComId,
          Is_Need_Count: searchInfo.Is_Need_Count
        }
      }).then(res => {
        if (res.returncode == 0) {
          /**修改值是否正确*/
          this.barLineTrendAjax_title=data.name+' - 软件使用趋势';
          this.barLineTrendAjax_state = 'render'
          this.barLineTrendAjax_data = res.returndata
        } else {
          /**报错信息是否正确*/
          this.barLineTrendAjax_state = 'err'
          this.barLineTrendAjax_data = res.returnmsg
        }
      })
    }
  }
}

