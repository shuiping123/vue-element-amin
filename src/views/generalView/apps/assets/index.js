import 'element-ui/lib/theme-chalk/display.css'
import { request } from '@/network'
import {downloadPDF} from '@/assets/js/htmlToPdf'

// 可复用
import SearchSelect from '@/components/SelectDown/SearchSelect'
import titleItem from '@/components/TitleItem/titleItem'
import pieAndGeneral from '@/components/Charts/pie-and-general'
import RadarChart from '@/components/Charts/RadarChart' //雷达

// 此页面独享
import treeCircle from '@/views/generalView/apps/component/treeCircle'
import tableItem from '@/views/generalView/apps/component/tableItem'
import CardItem from '@/views/generalView/apps/component/CardItem'
import animationPie from '@/views/generalView/apps/component/animationPie'
import line_chart from '@/views/generalView/apps/component/line_chart'
import routation from '@/views/generalView/apps/component/routation'
import piepiepie from '@/views/generalView/apps/component/piepiepie'
import lines from '@/views/generalView/apps/component/lines'

export default {
  name: 'apps-view',
  data() {
    return {
      // 查询条件 - 选中的参数
      searchInfo: {},
      /**
       * 软件的基础信息
       * */
      AppBasisInfo: {
        name: '',//软件名
        childApp: [''],//子软件/模块的数组
        type: '',//类别
        country: '',//国家
        appCom: '',//厂商
        iconUrl: null,//软件图标路径
        countryUrl: '',//国家图标路径
        decInfo: ''//描述
      },
      // 六个块
      TitleLst: [
        /**   id:ID，，name：显示名，value：值，util：单位，chain：环比 这里只需要给出正负值30/-30   */
        {
          id: 1,
          name: '软件装机量',
          title: '选定软件系列已安装的设备数量',
          value: 0,
          util: '',
          type: 'up',
          image: 'el-icon-s-tools',
          chain: 0
        },
        {
          id: 2,
          name: '访问用户数',
          title: '使用选定软件的用户数量，及相较上个查询周期的环比变化量',
          value: 0,
          util: '',
          type: 'up',
          image: 'el-icon-user-solid',
          chain: 0
        },
        {
          id: 3,
          name: '在勤天数',
          title: '选定软件在查询周期内的使用天数',
          value: 0,
          util: '',
          type: 'up',
          image: 'el-icon-s-order',
          chain: 0
        },
        {
          id: 4,
          name: '日均访问次数',
          title: '选定软件在查询周期内的日均打开次数',
          value: 0,
          util: '',
          type: 'up',
          image: 'el-icon-s-marketing',
          chain: 0
        },
        {
          id: 5,
          name: '次均授权用时',
          title: '选定软件在查询周期内的平均一次打开占用授权的时长',
          value: 0,
          util: '',
          type: 'up',
          image: 'el-icon-s-data',
          chain: 0
        },
        {
          id: 6,
          name: '异常和预警',
          title: '软件授权超长时间占用的预警记录条数,<a style=\'color: blue\'>跳转至概览页面查看</a>',
          value: 0,
          util: '',
          type: 'up',
          image: 'el-icon-message-solid',
          chain: 0,
          target: ['test2-2', {}]
        }
      ],
      // 用户使用分布
      userUsage: {
        loading: false,
        data: {}
      },
      // 评分/评估
      pingfen: {
        loading: false,
        data: {},
        data2: {},
        mjDay: 0,
        mjDay_max: 0,
        mjDay_pecent: 0,
        mjDay_util: '天'
      },
      // 中间的内容块 - 六个块
      SixLst: [],
      // 雷达的数据
      radar:{
        state:'nodata',
        errinfo:'',
        data:{
          name:'单位综合分析',
          data:[],
          indicator:[]
        }
      },
      // 超长用时的数据
      longTimeLst:[],
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普'
        }]
    }
  },
  components: { SearchSelect, titleItem, tableItem, treeCircle, pieAndGeneral, CardItem, animationPie,RadarChart,line_chart,routation,piepiepie,lines },
  methods: {
    DownPdf(){
      downloadPDF(this.$el,'测试')
    },
    getSearchData() {
      this.searchInfo = this.$refs.searchSelect.getSearchData()
    },
    async searchLoad() {
      await this.getSearchData()
      // 名片 - 用户使用分布
      this.getAppBaseInfo()
      // 六个块儿
      this.getTitleLst()
      // 树形图表
      this.$refs.treeCircle.guanxiFun()
      this.$refs.treeCircle.guanxiFun2()
      this.$refs.treeCircle.guanxiFun3()
      // 中间的六个块儿
      this.pingfen_jd_Fun();
      // 雷达图
      this.radarAjax();
      // 访问及授权用时趋势
      this.$refs.line_chart.renderChart(this.searchInfo);
      // 超长用时记录
      this.longTimeLog();
      // 轮播图
      this.$refs.rautation.renderFun(this.searchInfo)
      // 多个饼状图
      this.$refs.piepiepie.renderFun(this.searchInfo)
      // 多个线形图
      this.$refs.lines.renderFun(this.searchInfo)
    },
    // 获取名片信息  用户使用分布
    getAppBaseInfo() {
      const _this = this
      _this.userUsage.loading = true
      request({
        url: '/Ashx/ISystemOverview.ashx',
        params: {
          ty: 'GetSoftView_Soft_BasicInfo',
          StartDate: this.searchInfo.StartDate,
          EndDate: this.searchInfo.EndDate,
          ComId: this.searchInfo.ComId.join(','),
          ComFamId: this.searchInfo.ComFamId.join(','),
          BaokouAllChildComId: this.searchInfo.BaokouAllChildComId,
          Is_Need_Count: this.searchInfo.Is_Need_Count
        }
      }).then(res => {
        if (res.returncode == 0) {
          _this.userUsage.loading = false
          _this.AppBasisInfo = res.returndata
          _this.userUsage.data = res.outdata1
        }else {
          _this.$refs.pieAndGeneral.errFun(res.returnmsg)
        }
      })
    },
    // 获取头部六个块
    getTitleLst() {
      const _this = this
      request({
        url: '/Ashx/ISystemOverview.ashx',
        params: {
          ty: 'GetSoftView_DUTWL',
          StartDate: this.searchInfo.StartDate,
          EndDate: this.searchInfo.EndDate,
          ComId: this.searchInfo.ComId.join(','),
          ComFamId: this.searchInfo.ComFamId.join(','),
          BaokouAllChildComId: this.searchInfo.BaokouAllChildComId,
          Is_Need_Count: this.searchInfo.Is_Need_Count
        }
      }).then(res => {
        if (res.returncode == 0) {
          let data = res.returndata
          _this.TitleLst = _this.TitleLst.map((item, key) => {
            item.value = data.data[key]
            item.util = data.util[key]
            // 软件装机量特殊显示
            if (item.id == 1) {
              item.type = 'none'
              item.chain = `设备总数${data.chain[key] + item.util}`
              return item
            }
            item.type = data.chain[key] >= 0 ? 'up' : 'down'
            item.chain = data.chain[key] >= 0 ? '+' + data.chain[key] : data.chain[key]
            item.chain += item.util
            return item
          })
        }  else {

        }
      })
    },
    // 中间六个块  包含绩效两个图表及文字描述
    pingfen_jd_Fun() {
      const _this = this
      _this.pingfen.loading = true
      request({
        url: '/Ashx/ISystemOverview.ashx',
        params: {
          ty: 'GetSoftView_Soft_Token_Yj',
          StartDate: this.searchInfo.StartDate,
          EndDate: this.searchInfo.EndDate,
          ComId: this.searchInfo.ComId.join(','),
          ComFamId: this.searchInfo.ComFamId.join(','),
          BaokouAllChildComId: this.searchInfo.BaokouAllChildComId,
          Is_Need_Count: this.searchInfo.Is_Need_Count
        }
      }).then(res => {
        if (res.returncode == 0) {
          _this.pingfen.data = {
            value: res.outdata1.syDays,
            max: res.outdata1.totalDays,
            util: res.outdata1.util
          }
          _this.pingfen.data2 = {
            fenshu: res.outdata1.softScore,
            text: res.outdata1.healthType
          }
          _this.pingfen.loading = false
          _this.pingfen.mjDay = parseFloat(res.outdata1.mjDays)
          _this.pingfen.mjDay_max = parseFloat(res.outdata1.totalSearchDays)

          _this.pingfen.mjDay_pecent =parseFloat(res.outdata1.totalSearchDays)? parseFloat((parseFloat(res.outdata1.mjDays) / parseFloat(res.outdata1.totalSearchDays)).toFixed(2))*100:0
          _this.pingfen.mjDay_util = '天'
          _this.SixLst = res.returndata.map(item => {
            return {
              value: item.value,
              util: item.util
            }
          })
        }  else {
          _this.$refs.pingfen.errFun(res.returnmsg)
        }
      })
    },
    // 雷达 ajax请求
    radarAjax(){
      const _this = this
      _this.radar.state = 'loading';
      request({
        url: '/Ashx/ISystemOverview.ashx',
        params: {
          ty: 'GetSoftView_Soft_ComprehensiveAnalysis',
          StartDate: this.searchInfo.StartDate,
          EndDate: this.searchInfo.EndDate,
          ComId: this.searchInfo.ComId.join(','),
          ComFamId: this.searchInfo.ComFamId.join(','),
          BaokouAllChildComId: this.searchInfo.BaokouAllChildComId,
          Is_Need_Count: this.searchInfo.Is_Need_Count
        }
      }).then(res => {
        if (res.returncode == 0) {
          this.radar.state='render';
          this.radar.data={
            data:res.outdata1,
            indicator:res.returndata,
          }
        }else {
          this.radar.state='err';
          this.radar.errinfo=res.returnmsg;
        }
      })
    },
    // 超长用时记录
    longTimeLog(){
      request({
        url: '/Ashx/ISystemOverview.ashx',
        params: {
          ty: 'GetSoftView_LongTimeMx',
          StartDate: this.searchInfo.StartDate,
          EndDate: this.searchInfo.EndDate,
          ComId: this.searchInfo.ComId.join(','),
          ComFamId: this.searchInfo.ComFamId.join(','),
          BaokouAllChildComId: this.searchInfo.BaokouAllChildComId,
          Is_Need_Count: this.searchInfo.Is_Need_Count
        }
      }).then(res => {
        if (res.returncode == 0) {
          this.longTimeLst=res.outdata1
        }else {
          this.longTimeLst=[];
        }
      })
    }
  }
}
