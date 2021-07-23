<template>
  <div class="searchItem" style="width:auto!important;">
    <el-date-picker v-if="type!='timerange'"
      v-model="value2"
      :type="type"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right">
    </el-date-picker>
    <el-time-picker v-else
      is-range
      v-model="value2"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      placeholder="选择时间范围">
    </el-time-picker>
  </div>
</template>

<script>
  // 使用方式
  // <time-choose value="['2021-10-20','2021-11-20']" type="daterange"></time-choose>
  // type 当前的显示的方式，仅支持datetimerange,daterange（默认）
  // value 默认时间，格式['2021-10-20','2021-11-20']或''(空值)
  // 可通过给time-choose的ref赋值，获取当前的起始时间，例ref="datetime"
  // this.$refs.datetime.date获取值，获取到的值格式为'2020-10-10'或'2020-10-20 20:18:20'
  export default {
    name: 'TimeChoose',
    props: {
      value: {
        default(){
          return ''
        }
      },
      type: {
        type: String,
        default(){
          return 'daterange'
        }
      }
    },
    data() {
      return {
        pickerOptions: {
          shortcuts: [
            {
              text: '全年',
              onClick(picker) {
                picker.$emit('pick', [
                  new Date(new Date().getFullYear(), 0, 1).getTime(),
                  new Date(new Date().getFullYear(), 11, 31).getTime()
                ])
              }
            },
            {
              text: '本月',
              onClick(picker) {
                picker.$emit('pick', [
                  new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime(),
                  new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getTime()
                ])
              }
            },
            {
              text: '上月',
              onClick(picker) {
                picker.$emit('pick', [
                  new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime(),
                  new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getTime()
                ])
              }
            },
            {
              text: '近7天',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '近30天',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '近90天',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              }
            }]
        },
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: '',
        date: ''
      }
    },
    watch: {
      value2(newVal) {
        if (newVal != ''&&newVal!=undefined&&newVal!=null) {
          this.date = newVal.map(item => {
            let date = new Date(item)
            if(this.type=='daterange'){
              return date.getFullYear()+ '-'+(date.getMonth()+1)+'-'+date.getDate();
            }else if (this.type=='datetimerange'){
              return date.getFullYear()+ '-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            }else if(this.type=='timerange'){
              return date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            }
          })
        }else {
          this.date='';
        }
      },
      date(newVal){
        this.$emit('update:value',newVal)
      }
    },
    created() {
      if (this.value != '') {
        this.value2 = this.value.map(item=>{
          return new Date(item.replace(/-/,'/')).getTime()
        })
      }
    }
  }
</script>

<style>

</style>
