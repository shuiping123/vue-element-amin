<template>
  <div class="searchItem" style="width:auto!important;">
    <el-date-picker v-if="type!='timerange'"
                    v-model="value2"
                    :type="type"
                    :value-format="type=='daterange'?'yyyy-MM-dd':'yyyy-MM-dd HH:mm:ss'"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @change="pickFun"
                    align="right">
    </el-date-picker>
    <el-time-picker v-else
                    is-range
                    v-model="value2"
                    value-format="HH:mm:ss"
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
        default() {
          return ''
        }
      },
      type: {
        type: String,
        default() {
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
                  new Date(new Date().getFullYear(), 0, 1),
                  new Date(new Date().getFullYear(), 11, 31)
                ])
              }
            },
            {
              text: '本月',
              onClick(picker) {
                picker.$emit('pick', [
                  new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                  new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
                ])
              }
            },
            {
              text: '上月',
              onClick(picker) {
                picker.$emit('pick', [
                  new Date(new Date().getFullYear(), new Date().getMonth()-1, 1),
                  new Date(new Date().getFullYear(), new Date().getMonth(), 0)
                ])
              }
            },
            {
              text: '近7天',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [
                  new Date(start.getFullYear(), start.getMonth(), start.getDate()),
                  new Date(end.getFullYear(), end.getMonth(), end.getDate())
                ])
              }
            },
            {
              text: '近30天',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [
                  new Date(start.getFullYear(), start.getMonth(), start.getDate()),
                  new Date(end.getFullYear(), end.getMonth(), end.getDate())
                ])
              }
            },
            {
              text: '近90天',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [
                  new Date(start.getFullYear(), start.getMonth(), start.getDate()),
                  new Date(end.getFullYear(), end.getMonth(), end.getDate())
                ])
              }
            }]
        },
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: null,
      }
    },
    watch: {
      value2(newVal){
        if (this.type=='timerange') {
          if (!newVal){
            newVal=['00:00:00','00:00:00']
          }
          this.value2 = newVal
          this.$emit('update:value', newVal)
        }
      },
      value(newVal) {
        if (this.type!=='timerange') this.pickFun(newVal);
      }
    },
    mounted() {
      this.value2 = this.value
      this.pickFun(this.value);
    },
    methods:{
      pickFun(date){
        if (date == '' || date == undefined || date == null) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          let arr=[
            start.getFullYear()+'-'+(start.getMonth()+1)+'-'+start.getDate(),
            end.getFullYear()+'-'+ (end.getMonth()+1)+'-'+ end.getDate()
          ];
          date=arr;
        }
        this.$emit('update:value', date)
        this.value2=date;
      }
    }
  }
</script>

<style>

</style>
