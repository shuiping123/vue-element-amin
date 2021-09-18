<template>
  <!--六个块-->
  <el-col :xs="24" :sm="24" :md="14" :lg="15">
    <title-item :xs="24" :sm="12" :md="8" :lg="8" :data="TitleLst" @clickFun="transferStation"/>
  </el-col>
</template>

<script>
  import titleItem from '@/components/TitleItem/titleItem'
  export default {
    name: 'titleLst',
    components:{titleItem},
    props:['TitleLst'],
    data() {
      return {}
    },
    mounted() {
    },
    methods: {
      // 点击title动态执行函数 - 中转站
      transferStation(methodsWord) {
        this[methodsWord]()
      },
      // 异常预警跳转
      targetTag() {
        this.$router.push({
          name: 'test2-2',
          params: {}
        })
        this.$store.dispatch('tagsView/addView', this.$route)
      },
    }
  }
</script>

<style scoped>

</style>
