<template>
  <div style="width:100%">
    <div class="searchDiv">
<!--      <search-select ref="searchSelect" com="single" showdate="showdate" showtime="showtime" user="multiple" apptype="single" ></search-select>-->
      <search-select ref="searchSelect" com="single" dep="multiple" user="multiple" showdate="datetimerange" showtime="showtime" apptype="single" app="multiple" module="multiple"
                     showkeywords="showkeywords"
                     showsearchterm="multiple"
                     showisunstall="single"
                     showusername="showusername"
                     showdevname="showdevname"
                     showovertime="showovertime"
                     @searchAction="searchLoad"
      ></search-select>
    </div>
<!--    <search-select com="multiple" showdate="showdate" showtime="showtime" user="multiple"></search-select>-->
    <button @click="getSearchData()">获取查询数据</button>
    <p>显示结果</p>
    <p>{{obj}}</p>
    <el-row>
      <el-col :span="12">
        <p></p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import SearchSelect from '@/components/SelectDown/SearchSelect';
  import {request} from '@/network'
  export default {
    name: 'home',
    data(){
      return {
        obj:'',
        baseInfo:{
          appImg:'',
          appName:'',
          countryImg:'',
          country:'',
          csName:'',
          appChilds:[],
          type:'',
          desc:''
        },
      }
    },
    components: {SearchSelect},
    methods:{
      getSearchData(){
        this.obj=this.$refs.searchSelect.getSearchData();
      },
      searchLoad(){

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
