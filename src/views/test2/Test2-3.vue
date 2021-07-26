<template>
  <div style="width:100%">
    <div class="searchDiv">
<!--      <search-select ref="searchSelect" com="single" showdate="showdate" showtime="showtime" user="multiple" apptype="single" ></search-select>-->
      <search-select ref="searchSelect" com="single" dep="multiple" showdate="showdate" showtime="showtime" user="multiple" apptype="single" app="multiple" module="multiple"
                     showkeywords="showkeywords"
                     showsearchterm="multiple"
                     showisunstall="single"
                     showusername="showusername"
                     showdevname="showdevname"
                     showovertime="showovertime"
      ></search-select>
    </div>
<!--    <search-select com="multiple" showdate="showdate" showtime="showtime" user="multiple"></search-select>-->
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
