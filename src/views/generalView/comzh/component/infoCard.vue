<template>
  <el-row>
    <!--名片-->
    <el-col :xs="24" :sm="24" :md="10" :lg="9">
      <div class="cardBoxItem">
        <el-card shadow="hover">
          <div slot="header" class="clearfix infoCardTitle">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item>
                <i class="el-icon-office-building"
                   style="background:var(--mini-box-color);
                       color:#ffffff;font-size:20px
                       ;font-weight:bold;padding:8px;border-radius:5px;"/>
              </el-form-item>
              <el-form-item><span class="infoCardTitleSpan">{{BasisInfo.name}}</span></el-form-item>
              <i class="el-icon-download downExcel floatBtn" title="导出excel" @click="downExcel_baseInfo"/>
            </el-form>
          </div>
          <div class="infoCardBody">
            <el-form label-position="left" label-width="105px" class="demo-form-inline" size="mini">
              <el-form-item label="历史数据周期:" style="color: var(--box-color-font-blue)">
                <el-popover trigger="hover" placement="bottom-end">
                  <span>{{BasisInfo.historyDate}}</span>
                  <div class="ellipsisDiv" slot="reference">{{BasisInfo.historyDate}}</div>
                </el-popover>
              </el-form-item>
              <el-form-item label="子单位：">
                <el-popover trigger="hover" placement="bottom">
                  <span>{{BasisInfo.child}}</span>
                  <div class="ellipsisDiv" slot="reference"><span>{{BasisInfo.child}}</span></div>
                </el-popover>
              </el-form-item>
              <el-form-item label="总用户数：">
                <span>{{BasisInfo.usrNumGeneral}}人</span>
              </el-form-item>
              <el-form-item label="设备资产：">
                <span>{{BasisInfo.DevNum}}台</span>
              </el-form-item>
              <el-form-item label="软件资产：">
                <span>{{BasisInfo.AppNum}}个（来源国{{BasisInfo.sourceCountry_total}}个，厂商{{BasisInfo.sourceCS_total}}个）</span>
              </el-form-item>
              <el-form-item label="纳入监控数：">
                <span>{{BasisInfo.AppNum_jk}}个（来源国{{BasisInfo.sourceCountry_jk}}个，厂商{{BasisInfo.sourceCS_jk}}个）</span>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
    </el-col>
    <!--六个块-->
    <el-col :xs="24" :sm="24" :md="14" :lg="15">
      <title-item :xs="24" :sm="12" :md="8" :lg="6" :data="TitleLst" @clickFun="transferStation"/>
      <el-dialog title="在勤软件使用情况" :visible.sync="dialogTableVisible">
        <el-table :data="tableData" height="250" style="width: 100%">
          <el-table-column type="index" sortable label="序号" width="80"/>
          <el-table-column prop="name" sortable label="软件"/>
          <el-table-column prop="value_2" sortable label="国家"/>
          <el-table-column prop="value_3" sortable label="厂商"/>
          <el-table-column prop="value" sortable label="访问量(人)"/>
        </el-table>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
  import { request } from '../../../../network'
  import titleItem from '@/components/TitleItem/titleItem'
  import ResizeObserverPolyfill from 'resize-observer-polyfill';
  export default {
    name: 'infoCard',
    components: { titleItem },
    data() {
      return {
        /**
         * 基础信息
         * */
        BasisInfo: {
          name: '',//公司名
          historyDate: ' - ',//历史查询周期
          child: '',//子单位/部门的数组
          expertNum: 0,//专家数量
          usrNumGeneral: 0,//总用户数
          DevNum: 0,//设备资产
          AppNum: 0,//软件资产
          AppNum_jk: 0,//纳入监控数
          sourceCountry_total: 0,//软件资产——涉及国家
          sourceCS_total: 0,//软件资产——涉及厂商
          sourceCountry_jk: 0,//纳入监控数——涉及国家
          sourceCS_jk: 0//纳入监控数——涉及厂商
        },
        // 六个块
        TitleLst: [
          /**   id:ID，，name：显示名，value：值，util：单位，chain：环比 这里只需要给出正负值30/-30   */
          {
            id: 1,
            name: '在勤软件数量',
            title: '点此查看，<a style=\'color: blue\'>查看在勤软件</a>',
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
            name: '软件装机量',
            title: '',
            value: 0,
            util: '',
            type: 'up',
            image: 'el-icon-s-order',
            chain: 0
          },
          {
            id: 4,
            name: '关注软件数量',
            title: '',
            value: 0,
            util: '',
            type: 'up',
            image: 'el-icon-s-marketing',
            chain: 0
          },
          {
            id: 5,
            name: '软件在勤天数',
            title: '',
            value: 0,
            util: '',
            type: 'up',
            image: 'el-icon-s-data',
            chain: 0
          },
          {
            id: 6,
            name: '人均使用次数',
            title: '',
            value: 0,
            util: '',
            type: 'up',
            image: 'el-icon-s-grid',
            chain: 0
          },
          {
            id: 7,
            name: '人均授权占用时长',
            title: '',
            value: 0,
            util: '',
            type: 'up',
            image: 'el-icon-time',
            chain: 0
          },
          {
            id: 8,
            name: '异常和预警',
            title: '软件授权超长时间占用的预警记录条数,<a style=\'color: blue\'>跳转至概览页面查看</a>',
            value: 0,
            util: '',
            type: 'up',
            image: 'el-icon-message-solid',
            chain: 0,
            methods: 'targetTag'
          }
        ],
        //是否显示对话框
        dialogTableVisible: false,
        // 弹框显示 - 在勤软件使用情况
        tableData: []
      }
    },
    methods: {
      renderFun(searchInfo){
        this.getAppBaseInfo(searchInfo);
        this.getWorkedApp(searchInfo);
      },
      // 获取名片信息 以及 6个块数据
      getAppBaseInfo(searchInfo) {
        request({
          url: '/Ashx/ISystemOverview.ashx',
          params: {
            ty: 'GetComView_UDST',
            StartDate: searchInfo.StartDate,
            EndDate: searchInfo.EndDate,
            ComId: searchInfo.ComId.join(','),
            DepId: searchInfo.DepId.join(','),
            ComFamId: searchInfo.ComFamId.join(','),
            BaokouAllChildComId: searchInfo.BaokouAllChildComId,
            Is_Need_Count: searchInfo.Is_Need_Count
          }
        }).then(res => {
          if (res.returncode == 0) {
            // 名片
            this.BasisInfo = {
              name: res.returndata.ComName,//公司名
              historyDate: res.returndata.DataZq,
              child: res.returndata.ziCom,//子单位/部门的数组
              expertNum: 30,//专家数量
              usrNumGeneral: res.returndata.UsrNum,//总用户数
              DevNum: res.returndata.DevNum,//设备资产
              AppNum: res.returndata.SoftNum[0],//软件资产
              AppNum_jk: res.returndata.KeySoftNum[0],//纳入监控数
              sourceCountry_total: res.returndata.SoftNum[1],//软件资产——涉及国家
              sourceCS_total: res.returndata.SoftNum[2],//软件资产——涉及厂商
              sourceCountry_jk: res.returndata.KeySoftNum[1],//纳入监控数——涉及国家
              sourceCS_jk: res.returndata.KeySoftNum[2]//纳入监控数——涉及厂商
            }
            // 六个块
            let arr = [0, 1, 2, 6, 3, 4, 5, 7]//存后端传过来的顺序
            this.TitleLst = this.TitleLst.map((item, key) => {
              item.value = res.outdata1.data[arr[key]]
              item.util = res.outdata1.util[arr[key]]
              // 在勤软件数量特殊显示
              if (item.id == 1) {
                item.type = 'none'
                item.chain = `关联厂商${res.outdata1.chain[arr[key]] + item.util}`
                return item
              }
              // 软件在勤天数特殊显示
              if (item.id == 5) {
                item.type = 'none'
                item.chain = `授权密集占用天数${res.outdata1.chain[arr[key]] + item.util}`
                return item
              }
              item.type = res.outdata1.chain[arr[key]] >= 0 ? 'up' : 'down'
              item.chain = res.outdata1.chain[arr[key]] >= 0 ? '+' + res.outdata1.chain[arr[key]] : res.outdata1.chain[arr[key]]
              item.chain += item.util
              return item
            })
          } else {
          }
        })
      },
      // 获取在勤软件使用情况弹框内容
      getWorkedApp(searchInfo) {
        request({
          url: '/Ashx/ISystemOverview.ashx',
          params: {
            ty: 'GetComView_ComFamMx',
            StartDate: searchInfo.StartDate,
            EndDate: searchInfo.EndDate,
            ComId: searchInfo.ComId.join(','),
            DepId: searchInfo.DepId.join(','),
            ComFamId: searchInfo.ComFamId.join(','),
            BaokouAllChildComId: searchInfo.BaokouAllChildComId,
            Is_Need_Count: searchInfo.Is_Need_Count
          }
        }).then(res => {
          if (res.returncode == 0) {
            this.tableData=res.returndata;
          } else {
          }
        })
      },
      // 点击title动态执行函数 - 中转站
      transferStation(methodsWord) {
        this[methodsWord]()
      },
      // 展示所有在勤软件数量
      showList() {
        this.dialogTableVisible = true
      },
      // 异常预警跳转
      targetTag() {
        this.$router.push({
          name: 'test2-2',
          params: {}
        })
        this.$store.dispatch('tagsView/addView', this.$route)
      },
      // 名片导出
      downExcel_baseInfo() {
        let data = {
          name: '公司名片',
          data: [
            ['名称：', this.BasisInfo.name],
            ['历史数据周期：', this.BasisInfo.historyDate],
            ['子单位：', this.BasisInfo.child],
            ['总用户数：', this.BasisInfo.usrNumGeneral + '人'],
            ['设备资产：', this.BasisInfo.DevNum + '台'],
            ['软件资产：', `${this.BasisInfo.AppNum}个（来源国${this.BasisInfo.sourceCountry_total}个，厂商${this.BasisInfo.sourceCS_total}个）`],
            ['纳入监控数：', `${this.BasisInfo.AppNum_jk}个（来源国${this.BasisInfo.sourceCountry_jk}个，厂商${this.BasisInfo.sourceCS_jk}个）`]
          ]
        }
        this.$current.exportExcel(data.name, data)
      }

    }
  }
</script>

<style scoped>

</style>
