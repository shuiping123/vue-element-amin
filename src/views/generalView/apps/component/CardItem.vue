<template>
  <div class="cardItemDiv">
    <el-col :xs="8" :sm="8" :md="8" :lg="8" v-for="item in arr">
      <div class="cardBoxItem">
        <el-card shadow="hover" style="text-align: center;">
          <el-popover
            placement="top-start"
            trigger="hover"
            :content="item.name">
            <div slot="reference" class="cardName ellipsisDiv">{{item.name}}</div>
          </el-popover>
          <div class="cardIcon ellipsisDiv">
            <i :class="item.icon"></i>
          </div>
          <el-popover
            placement="bottom-end"
            trigger="hover"
            :content="item.value+item.util">
            <div slot="reference" class="cardValue ellipsisDiv">{{item.value}}{{item.util}}</div>
          </el-popover>
        </el-card>
      </div>
    </el-col>
  </div>
</template>

<script>
  import ResizeObserverPolyfill from 'resize-observer-polyfill';

  export default {
    name: 'CardItem',
    props:{
      value:{
        type:Array,
        default:[]
      }
    },
    watch:{
      value(newVl){
        if (newVl.length){
          this.arr=this.arr.map((item,key)=>{
            item.value=newVl[key].value;
            item.util=newVl[key].util;
            return item;
          })
        }
      }
    },
    data() {
      return {
        arr: [
          // {id: 1, name: '总授权数量', value: 0, util: '个', icon: 'el-icon-s-order'},
          { id: 1, name: '总授权数量', value: 0, util: '个', icon: 'el-icon-s-platform' },
          { id: 2, name: '最大并发峰值', value: 0, util: '个', icon: 'el-icon-s-marketing' },
          { id: 3, name: '并发峰值中位数', value: 0, util: '%', icon: 'el-icon-s-data' },
          { id: 4, name: '满载率', value: 0, util: '%', icon: 'el-icon-stopwatch' },
          { id: 5, name: '高负载预警', value: 0, util: '条', icon: 'el-icon-message-solid' },
          { id: 6, name: '高负载预警频率', value: 0, util: '时/条', icon: 'el-icon-s-order' }
        ]
      }
    }
  }
</script>

<style scoped>
  .cardItemDiv .cardIcon {
    color: #6e50f5;
    /*color: var(--mini-box-color);*/
    font-size: 50px;
    margin: 20px auto;
  }

  .cardItemDiv .cardName {
    font: 13px Small;
    color: #606266;
  }

  .cardItemDiv .cardValue {
    font: 	18px large;
    color: #303133;
  }
</style>
