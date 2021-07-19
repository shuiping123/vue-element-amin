<template>
  <div>
    <test2_6 ref="first"></test2_6>
    {{hello}}
  </div>
</template>

<script>
  import test2_6 from './Test2-6'

  export default {
    name: 'Test2-5',
    data() {
      return {
        hello: null
      }
    },
    methods: {
      getMsgForC() {
        //直接获取子组件的值
        // console.log(this.$refs.first.msg)
        return this.$refs.first.msg;
      }
    },
    components: {
      test2_6
    },
    mounted() {
      // this.getMsgForC();
      this.hello=this.getMsgForC();
    }
  }
</script>

<style scoped>

</style>
