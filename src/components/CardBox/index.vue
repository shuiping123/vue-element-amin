<template>
  <div class="cardBox" :class="isfull?'el-dialog__wrapper fullScrollStyle':''">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'index',
    props: {
      isfull:{
        type:Boolean,
        default:false
      }
    },
    methods:{

    }
  }
</script>

<style>

</style>
