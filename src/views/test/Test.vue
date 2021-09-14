<template>
  <div>
    <!--<div class="itemDiv">-->
    <!--  <bar :loading="loading"/>-->
    <!--</div>-->
    <!--<div class="itemDiv">-->
    <!--  <pie-chart :loading="loading"></pie-chart>-->
    <!--</div>-->
    <!--<button type="button" @click="changeLoading">刷新2</button>-->
    <div ref="app"></div>
  </div>
</template>

<script>
  import bar from './../charts/bar'
  import pieChart from '../charts/pieChart'

  export default {
    name: 'Test',

    components: {
      bar,
      pieChart
    },
    data: function() {
      return {
        loading: true
      }
    },
    mounted() {
      console.log(this.$el)
      console.log(this.$refs.app)
    },
    methods: {
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
  @import "./../../assets/css/current.css";

  .itemDiv {
    width: 100%;
    height: 300px;
  }
</style>
