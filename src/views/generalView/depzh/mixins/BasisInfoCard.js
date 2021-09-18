import { request } from '@/network'

export const BasisInfoCard={
  data(){
    return {
      /**用户名片*/
      BasisInfo:{},
      /**六个块*/
      TitleLst: [
        /**   id:ID，，name：显示名，value：值，util：单位，chain：环比 这里只需要给出正负值30/-30   */
        {
          id: 1,
          name: '在勤软件',
          title: '',
          value: 0,
          util: '',
          type: 'up',
          image: 'el-icon-s-tools',
          chain: 0,
          methods: 'showList'
        },
        {
          id: 2,
          name: '访问用户数',
          title: '',
          value: 0,
          util: '',
          type: 'up',
          image: 'el-icon-user-solid',
          chain: 0
        },
        {
          id: 3,
          name: '软件源厂商',
          title: '',
          value: 0,
          util: '',
          type: 'up',
          image: 'el-icon-s-order',
          chain: 0
        },
        {
          id: 4,
          name: '软件在勤天数',
          title: '',
          value: 0,
          util: '',
          type: 'up',
          image: 'el-icon-s-marketing',
          chain: 0
        },
        {
          id: 5,
          name: '人均授权占用时长',
          title: '',
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
          methods: 'targetTag'//对应的函数
        }
      ],
    }
  },
  mounted(){},
  methods:{
    getBasisInfo(searchInfo){
      request({
        url: '/Ashx/ISystemOverview.ashx',
        params: {
          ty: 'GetDepView_SUTWC',
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
          // 名片
          this.BasisInfo = {
            name: res.returndata.DepName,//部门名称
            historyDate: res.returndata.DataZq,//历史监测周期
            expertNum: res.returndata.ExpertNum,//专家数量
            UsrNum: res.returndata.UsrNum,//总用户数
            DevNum: res.returndata.DevNum,//总设备数
            AppNum: res.returndata.SoftNum,//总软件数
            AppNum_jk: res.returndata.KeySoftNum,//软件纳入监控数
            Apps_PH: res.returndata.App_PH,//部门偏好软件
          };
          // 六个块
          let arr = [1, 2, 4, 0, 3, 5]//存后端传过来的顺序,现在的顺序，对应后端传过来数据的第几个数据
          this.TitleLst = this.TitleLst.map((item, key) => {
            item.value = res.outdata1.data[arr[key]]
            item.util = res.outdata1.util[arr[key]]
            item.type = res.outdata1.chain[arr[key]] >= 0 ? 'up' : 'down'
            item.chain = res.outdata1.chain[arr[key]] >= 0 ? '+' + res.outdata1.chain[arr[key]] : res.outdata1.chain[arr[key]]
            item.chain += item.util
            return item
          })
        } else {
        }
      })
    }
  },
}
