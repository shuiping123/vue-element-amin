<template>
  <div style="width:100%">
    <div class="searchDiv">
<!--      <search-select ref="searchSelect" com="single" showdate="showdate" showtime="showtime" user="mutiple" apptype="single" ></search-select>-->
      <search-select ref="searchSelect" com="single" showdate="showdate" showtime="showtime" user="mutiple" apptype="single" app="mutiple" module="mutiple"></search-select>
    </div>
<!--    <search-select com="mutiple" showdate="showdate" showtime="showtime" user="mutiple"></search-select>-->
    <button @click="getSearchData()">获取查询数据</button>
    <p>显示结果</p>
    <p>{{obj}}</p>
  </div>
</template>

<script>
  import SearchSelect from '@/components/SelectDown/SearchSelect';
  export default {
    name: 'home',
    data(){
      return {
        obj:''
      }
    },
    components: {SearchSelect},
    methods:{
      getSearchData(){
        this.obj=this.$refs.searchSelect.getSearchData();
      }
    }
  };
</script>

<style>
  .searchDiv{
    background: #F2F6FC;
    width: 100%;
  }

</style>
