<template>
  <div>
    <el-col :xs="xs" :sm="sm" :md="md" :lg="lg" v-for="(item,key) in data">
      <el-popover trigger="hover" placement="top-end">
        <span v-html="item.title"></span>
        <div class="cardBoxItem" slot="reference">
          <el-card shadow="hover">
            <div>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" style="text-align: center">
                <span class="titleImg" style="line-height: 120px;"><i :class="item.image"></i></span>
              </el-col>
              <el-col :xs="16" :sm="16" :md="16" :lg="16" style="padding-left: 10px;padding-bottom: 20px">
                <h5 class="card-title">{{item.name}}</h5>
                <h1 style="margin-bottom: 1rem">{{item.value}}{{item.util}}</h1>
                <div>
                    <span :class="item.type==='up'?'success-span':'danger-span'" v-if="item.type!=='none'">
                      {{item.chain}}{{item.util}}
                    </span>
                  <span style="font-size: 0.875rem;font-weight: 400;line-height: 1.5;" v-else>{{item.chain}}</span>
                </div>
              </el-col>
            </div>
          </el-card>
        </div>
      </el-popover>

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

    }
  }
</script>

<style scoped>

  .titleImg {
    padding: 10px;
    background: #42b983;
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
