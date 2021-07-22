<template>
  <div style="width:100%">
    <search-select com="com" showdate="showdate" showtime="showtime" user="user" apptype="apptype" app="app" module="module"></search-select>
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
