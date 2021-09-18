import { request } from '@/network'

export const treeChartAjax = {
  data() {
    return {
      /**echart树形图的数据*/
      treeChartAjax_state:'noData',
      treeChartAjax_data:[],
    }
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
    treeChartAjax_fun(searchInfo){
      this.treeChartAjax_state='loading';
      request({
        url: '/Ashx/ISystemOverview.ashx',
        params: {
          ty: 'GetDepView_Portrait_Left',
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
          this.treeChartAjax_state='render';
          this.treeChartAjax_data=res.returndata;
        } else {
          this.treeChartAjax_state='err';
          this.treeChartAjax_data=res.returnmsg;
        }
      })
    }
  }
}
