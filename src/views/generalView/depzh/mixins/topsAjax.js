import { request } from '@/network'

export const topsAjax = {
  data() {
    return {
      /**echart树形图的数据*/
      topsAjax_state: 'noData',
      topsAjax_usrAvgTime_data: [],//用户日均授权占用时长排行 top数据
      topsAjax_cs_data: [],//软件来源厂商访问量排行 top数据
      topsAjax_country_data: [],//软件来源国维度访问量排行 top数据
    }
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
    topsAjax_fun(searchInfo) {
      this.topsAjax_state = 'loading'
      request({
        /**修改url、ty、params传参*/
        url: '/Ashx/ISystemOverview.ashx',
        params: {
          ty: 'GetDepView_RankingList',
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
          this.topsAjax_state = 'render'
          this.topsAjax_usrAvgTime_data = res.returndata;
          this.topsAjax_cs_data = res.outdata1;
          this.topsAjax_country_data = res.outdata2;
        } else {
          /**报错信息是否正确*/
          this.topsAjax_state = 'err'
          this.topsAjax_usrAvgTime_data = res.returnmsg
          this.topsAjax_cs_data = res.returnmsg
          this.topsAjax_country_data = res.returnmsg
        }
      })
    }
  }
}

