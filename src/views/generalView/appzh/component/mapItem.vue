<template>
  <el-col :xs="12" :sm="12" :md="6" :lg="6" class="mapItem">
    <div class="cardBoxItem">
      <el-card shadow="hover" :body-style="{padding:'10px'}">
        <div style="width: 100%;">
          <el-row style="height: 80px">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" style="text-align: center">
                <span class="titleImg" style="line-height: 80px;"><i :class="icon"></i></span>
            </el-col>
            <el-col :xs="16" :sm="16" :md="16" :lg="16" style="padding-left: 10px;">
              <el-popover trigger="hover" placement="left">
                <span v-html="name"></span>
                <p slot="reference" class="card-title ellipsisDiv">{{name}}</p>
              </el-popover>
              <el-popover trigger="hover" placement="left">
                <span v-html="valuetext+util"></span>
                <h1 slot="reference" style="margin-bottom: 1rem;" class="ellipsisDiv">{{valuetext+util}}</h1>
              </el-popover>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
  </el-col>

</template>

<script>
  import ResizeObserverPolyfill from 'resize-observer-polyfill';

  export default {
    name: 'mapItem',
    props:{
      title:{
        type:String,
        default:''
      },
      icon:{
        type:String,
        default:''
      },
      name:{
        type:String,
        default:''
      },
      valuetext:{
        type:Number,
        default:0
      },
      util:{
        type:String,
        default:''
      }
    },
    data(){
      return {

      }
    }
  }
</script>

<style scoped>
  .mapItem .titleImg {
    padding: 5px;
    /*background: var(--box-color-blue);*/
    /*color: #ffffff;*/
    color: var(--mini-box-color);
    font-size: 2em;
    border-radius: 5px;
    width: 100%;
    /*border: var(--mini-box-color) 1px solid;*/
  }

  .mapItem  .h1,.mapItem  h1 {
    font-size: 1.25rem;
  }



  .mapItem .card-title {
    font-size: 0.775rem;
    /*color: #495057;*/
  }

  .mapItem .card-subtitle, .mapItem .card-title {
    /*font-weight: 350;*/
  }


  .mapItem .mt-1 {
    margin-top: 0.25rem !important;
  }
</style>
