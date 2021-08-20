<template>
  <div>
    <button @click="targetToAddTags('apps-view',[1])">跳转2-2</button>
  </div>
</template>

<script>
export default {
  name: 'Test2',
  methods:{
    targetToAddTags(urlName, id) {
      this.$router.push({
        name: urlName,
        params: {
          startdate:'2020-10-21',
          enddate:'2020-10-22',
          // comid: id,
          // depid:[-2]
        }
      })
      this.$store.dispatch('tagsView/addView', this.$route)
    },
  }
}
</script>

<style scoped>

</style>
