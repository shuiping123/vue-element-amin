<template>
  <div class="titleItem">
    <el-col :xs="xs" :sm="sm" :md="md" :lg="lg" v-for="(item,key) in data">
      <div class="cardBoxItem">
        <el-popover trigger="hover" placement="bottom-end">
          <div>
            <p v-html="item.name"/>
            <p v-html="item.value+item.util"/>
            <p v-html="item.chain"/>
            <p v-html="item.title" v-if="item.title" @click="clickFun(item.methods)"/>
          </div>
          <el-card shadow="hover" slot="reference">
            <el-row>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" style="text-align: center">
                <span class="titleImg" style="line-height: 120px;"><i
                  :class="item.image"></i></span>
              </el-col>
              <el-col :xs="16" :sm="16" :md="16" :lg="16" style="padding-left: 10px;padding-bottom: 20px;">
                <div>
                  <h5 class="card-title ellipsisDiv">{{item.name}}</h5>
                  <h1 style="margin-bottom: 1rem;" class="ellipsisDiv">{{item.value}}{{item.util}}</h1>
                  <div class="ellipsisDiv">
                    <span :class="item.type==='up'?'success-span':'danger-span'" v-if="item.type!=='none'">
                      {{item.chain}}
                    </span>
                    <span class="success-span" v-else>{{item.chain}}</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-popover>

      </div>

    </el-col>
  </div>
</template>

<script>
  /**
   * 头部的样式
   * 数据格式：
   * @params name 标题
   * @params title 释义
   * @params value 值
   * @params util 单位，例：天、时、次
   * @params type 判断颜色 up-绿色 | down-红色 | none 绿色；当前正数或特殊显示文字用绿色，负数文字用红色
   * @params image 图标的样式class，在element图标中查找
   * @params chain 环比位置显示的文字，这里传入值要写全。例：+498人、设备总数123个等
   * @params methods 点击悬浮框执行的函数，这里传入函数名，例：targetTag
   * 父组件需要特殊写法，父组件写法如下：
   * |-------------------------------------------------------------------------------------------------------------|
   * | template中                                                                                                   |
   * |   <title-item :xs="24" :sm="8" :md="8" :lg="8" :data="TitleLst" @clickFun="transferStation"></title-item>    |
   * | js中                                                                                                         |
   *       //中转站
   transferStation(methodsWords){
              this[methodsWords]()
            },
   // 跳转标签tag
   targetTag(){
            this.$router.push({
              name: 'test2-2',
              params: {}
              })
              this.$store.dispatch('tagsView/addView', this.$route)
           }
   * |                                                                                                            |
   * |------------------------------------------------------------------------------------------------------------|
   * */
  export default {
    name: 'titleItem',
    props: {
      data: {
        type: Array,
        default: []
      },
      xs: Number, sm: Number, md: Number, lg: Number

    },
    methods: {
      clickFun(methodsWord) {
        this.$emit('clickFun', methodsWord)
      },
      targetToAddTags() {
        let data = arguments[0]
        if (data) {
          this.$router.push({
            name: data[0],
            params: data[1]
          })
          this.$store.dispatch('tagsView/addView', this.$route)
        }

      }
    }
  }
</script>

<style>

  .titleItem .titleImg {
    padding: 10px;
    background: var(--mini-box-color);
    color: var(--icon-card-color);
    font-size: 2em;
    border-radius: 5px;
    width: 100%;
  }

  .titleItem .h1, .titleItem h1 {
    font-size: 1.35rem;
  }

  .titleItem .success-span {
    color: #3cb72c;
  }

  .titleItem .danger-span {
    color: #F56C6C;
  }


  .titleItem .card-title {
    font-size: 0.775rem;
    color: #495057;
  }

  .titleItem .card-subtitle, .titleItem .card-title {
    font-weight: 400;
  }


  .titleItem .mt-1 {
    margin-top: .25rem !important;
  }


</style>
