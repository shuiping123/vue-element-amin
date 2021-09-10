<template>
  <i class="el-icon-data-analysis loadMore floatBtn" :title="title" @click="tagTab"/>

</template>

<script>
  export default {
    name: 'TagTab',
    props:{
      title:{
        type:String,
        default:'跳转'
      }
    },
    methods:{
      tagTab(){
        this.$emit('tagTab')
      }
    }
  }
</script>

<style scoped>
  /*.loadMore:hover{*/
  /*  color: #7e7e7e*/
  /*}*/
</style>
