<template>
 <div>
   <el-table
     :data="tabledata"
     style="width: 100%;"
     height="320"
     :default-sort="{prop: 'date', order: 'descending'}">
     <el-table-column
       prop="date"
       label="日期"
       sortable>
     </el-table-column>
     <el-table-column
       prop="name"
       label="姓名"
       sortable>
     </el-table-column>
     <el-table-column
       prop="address"
       label="地址">
     </el-table-column>
   </el-table>
   <el-pagination
     style="padding: 10px 0"
     :current-page="currentPage"
     @size-change="handleSizeChange"
     @current-change="handleCurrentChange"
     :page-sizes="[100, 200, 300, 400]"
     :page-size="100"
     layout="total, sizes, prev, pager, next, jumper"
     :total="400">
   </el-pagination>
 </div>
</template>

<script>
  export default {
    name: 'tableItem',
    props:{
      tabledata:{
        type:Array,
        default:[]
      }
    },
    data(){
      return {
        currentPage:4
      }
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style scoped>

</style>
