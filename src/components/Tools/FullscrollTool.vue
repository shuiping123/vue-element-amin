<template>
  <i class="maxSize floatBtn" :class="!isfull?'el-icon-full-screen':'el-icon-switch-button'" :title="!isfull?'最大化':'关闭最大化'" @click="fullScrollFun(!isfull)"/>
</template>

<script>
  import PopupManager from 'element-ui/src/utils/popup/popup-manager'
  import { addClass, getStyle, hasClass } from 'element-ui/src/utils/dom'
  import getScrollBarWidth from 'element-ui/src/utils/scrollbar-width'

  export default {
    name: 'FullscrollTool',
    props:{
      isfull:{
        type:Boolean,
        default:false
      }
    },
    methods: {
      fullScrollFun(boo) {
        if (boo) {
          this.stopMove();
        } else {
          this.Move();
        }
        this.$emit('update:isfull', boo)
      },
      //停止页面滚动
      stopMove() {
        let m = function(e) {
          e.preventDefault();
        };
        document.body.style.overflow = 'hidden';
        document.addEventListener("touchmove", m, true);//禁止页面滑动
      },
      //开启页面滚动
      Move() {
        let m = function(e) {
          e.preventDefault();
        };
        document.body.style.overflow = 'auto';//出现滚动条
        document.removeEventListener("touchmove", m, true);
      }
    }
  }
</script>

<style scoped>

</style>
