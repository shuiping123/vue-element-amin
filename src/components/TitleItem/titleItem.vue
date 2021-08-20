<template>
  <div>
    <el-col :xs="xs" :sm="sm" :md="md" :lg="lg" v-for="(item,key) in data">
      <div class="cardBoxItem">
        <el-card shadow="hover">
          <div>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" style="text-align: center">
              <el-popover trigger="hover" placement="top-end">
                <span v-html="item.title" @click="targetToAddTags(item.target)"></span>
                <span class="titleImg" slot="reference" style="line-height: 120px;"><i :class="item.image"></i></span>
              </el-popover>
            </el-col>

            <el-col :xs="16" :sm="16" :md="16" :lg="16" style="padding-left: 10px;padding-bottom: 20px;">
              <el-popover trigger="hover" placement="left">
                <span v-html="item.name"></span>
                <h5 slot="reference" class="card-title ellipsisDiv">{{item.name}}</h5>
              </el-popover>
              <el-popover trigger="hover" placement="left">
                <span v-html="item.value+item.util"></span>
                <h1 slot="reference" style="margin-bottom: 1rem;" class="ellipsisDiv">{{item.value}}{{item.util}}</h1>
              </el-popover>
              <el-popover trigger="hover" placement="bottom-end">
                <span v-html="item.chain"></span>
                <div class="ellipsisDiv" slot="reference">
                    <span :class="item.type==='up'?'success-span':'danger-span'" v-if="item.type!=='none'">
                      {{item.chain}}
                    </span>
                  <span class="success-span" v-else>{{item.chain}}</span>
                </div>
              </el-popover>

            </el-col>
          </div>
        </el-card>
      </div>

    </el-col>
  </div>
</template>

<script>
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

  .titleImg {
    padding: 10px;
    background: var(--mini-box-color);
    color: #ffffff;
    font-size: 2em;
    border-radius: 5px;
    width: 100%;
  }

  .h1, h1 {
    font-size: 1.75rem;
  }

  .success-span {
    color: #3cb72c;
  }

  .danger-span {
    color: #F56C6C;
  }


  .card-title {
    font-size: 0.775rem;
    color: #495057;
  }

  .card-subtitle, .card-title {
    font-weight: 400;
  }


  .mt-1 {
    margin-top: .25rem !important;
  }


</style>
