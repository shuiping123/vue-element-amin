<template>
  <div>
    test2-1
    <p>传过来的值：{{ id }}</p>
  </div>
</template>

<script>
export default {
  name: 'Test2',
  data() {
    return {
      id: null
    }
  },
  created() {
    this.getId()
  },
  methods: {
    getId() {
      var { id } = this.$route.params
      console.log(this.$route)
      if (id) {
        this.id = id
      }
    }
  }
}
</script>

<style scoped>

</style>
