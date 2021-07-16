<template>
  <div>
    <div id="testId" />
    <button @click="targetToAddTags('test2-1',5)">增加页面</button>
    <button @click="refreshEcharts()">刷新图表，不刷页面</button>
    <bar :loading="loading" />
    <bar :loading="loading" />
    <button type="button" @click="changeLoading">刷新2</button>
  </div>
</template>

<script>
import { barFun, showLoadingForEcharts } from '../../components/Echarts'
import bar from './../charts/bar'

export default {
  name: 'Test',
  components: {
    bar
  },
  data: function() {
    return {
      echarts: {
        barEcharts: null
      },
      loading: false
    }
  },
  mounted() {
    this.echarts.barEcharts = barFun('testId', this.echarts.barEcharts)
  },
  methods: {
    targetToAddTags(urlName, id) {
      this.$router.push({
        name: urlName,
        params: {
          id: id
        }
      })
      this.$store.dispatch('tagsView/addView', this.$route)
    },
    refreshEcharts() {
      const _this = this
      showLoadingForEcharts(_this.echarts.barEcharts)
      setTimeout(() => {
        barFun('testId', _this.echarts.barEcharts)
      }, 3000)
    },
    changeLoading() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 2000)
    }
  }
}
</script>

<style>
  #testId {
    /*color: red;*/
    width: 100%;
    height: 300px;
    /*background: red;*/
  }
</style>
