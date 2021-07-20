<template>
  <div style="width:100%">
    <search-select com="com" showdate="showdate" user="user" app="app"></search-select>
  </div>
</template>

<script>
  import SearchSelect from '@/components/SelectDown/SearchSelect';
  export default {
    name: 'home',
    components: {SearchSelect},
  };
</script>

<style scoped>

</style>
