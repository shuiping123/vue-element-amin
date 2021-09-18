<template>
  <el-col :xs="xs" :sm="sm" :md="md" :lg="lg">
    <div class="cardBoxItem">
      <el-card shadow="hover">
        <card-box :style="{height:height+'px'}">
          <div class="cardBoxTitle">
            <!-- 标题 -->
            <span>{{title_content}}</span>
            <!-- 导出excel按钮 -->
            <down-excel-tool @downExcel="downExcel"/>
          </div>
          <div class="cardBoxContent">
            <!-- 表格内容 -->
            <el-table :data="data" :height="(height-40)+'px'" style="width: 100%">
              <!--<el-table-column label="序号" type="index" width="50"/>-->
              <el-table-column prop="name" label="用户"/>
              <el-table-column label="软件数" width="70">
                <template slot-scope="scope">
                  <span class="aStyle" @click="openModalTable(scope.row)">{{scope.row.usrSoftNum}}个</span>
                </template>
              </el-table-column>
              <el-table-column prop="avgTokenHour" label="授权占用时长" width="110">
                <template slot-scope="scope">
                  <span>{{scope.row.avgTokenHour}}时/天</span>
                </template>
              </el-table-column>
              <el-table-column  label="使用次数">
                <template slot-scope="scope">
                  <span>{{scope.row.useTimes}}次</span>
                </template>
              </el-table-column>
              <el-table-column prop="address" label="操作" width="50">
                <template slot-scope="scope">
                  <!--跳转-->
                  <!--这里可以写特殊定义的内容，例-->
                  <!--{{scope.row.name}}-->
                  <tag-tab-tool class="clearFloat" title="跳转到用户维度概览查看" @tagTab="$current.tagTab('test2-2',{})"/>
                </template>
              </el-table-column>
            </el-table>
            <el-dialog :title="modal_title" :visible.sync="dialogTableVisible">
              <el-table :data="gridData">
                <el-table-column label="序号" type="index" width="50"/>
                <el-table-column prop="name" label="软件" />
                <el-table-column label="授权占用时长" width="110"><span slot-scope="scope">{{scope.row.avgTokenHour}}时/天</span></el-table-column>
                <el-table-column label="有效工作时长" width="110"><span slot-scope="scope">{{scope.row.avgWorkHour}}时/天</span></el-table-column>
                <el-table-column label="使用次数" width="110"><span slot-scope="scope">{{scope.row.useTimes}}次</span></el-table-column>
              </el-table>
            </el-dialog>
          </div>
        </card-box>
      </el-card>
    </div>
  </el-col>
</template>
<script>
  export default {
    name: 'treeChartTable',
    props: {
      xs: { type: Number, default: 24 },
      sm: { type: Number, default: 24 },
      md: { type: Number, default: 24 },
      lg: { type: Number, default: 24 },
      height: { type: Number, default: 400 },
      /**标题*/
      title_content: { type: String, default: '标题' },
      /**数据*/
      data: {
        type: Array, default: () => []
      }
    },
    data() {
      return {
        dialogTableVisible:false,//弹框默认不打开
        gridData: [],//弹框表格的数据
        modal_title:''//弹框标题
      }
    },
    mounted() {
    },
    methods: {
      /**打开弹框*/
      openModalTable(row){
        this.dialogTableVisible = true;
        this.gridData=row.children;//更新弹框的数据
        this.modal_title=row.name+' - 使用软件详情';//更新弹框的标题
      },
      /**导出excel*/
      downExcel() {
        // sheet1
        let data = {
          name: this.title_content+'概览表',
          data: [['序号','用户', '软件数(个)','日均授权占用时长(时/天)','使用次数(次)']]
        }
        //做数据处理
        this.data.map((item,key)=>{
          data.data.push([key+1,item.name,item.usrSoftNum,item.avgTokenHour,item.useTimes])
        })
        //sheet2
        let data2={
          name: this.title_content+'详情表',
          data: [['用户', '软件','日均授权占用时长(时/天)','日均有效工作时长(时/天)','使用次数(次)']]
        }
        this.data.map((item)=>{
          item.children.map((child_item)=>{
            data2.data.push([item.name,child_item.name,child_item.avgTokenHour,child_item.avgWorkHour,child_item.useTimes])
          })
        })
        //最后导出
        let func = this.$current.exportExcel
        func(this.title_content, data,data2)
      }
    }
  }
</script>

<style scoped>

</style>
