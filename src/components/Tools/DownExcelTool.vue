<template>
  <i class="el-icon-download downExcel floatBtn" title="导出excel" @click="downExcel"/>
</template>

<script>
  export default {
    name: 'DownExcelTool',
    methods:{
      downExcel(){
        this.$emit('downExcel')
      }
    }
  }
</script>

<style scoped>

</style>
