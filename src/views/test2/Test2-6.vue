<template>
  <div id="pdfDom" class="test" style="width:100%;background:red;height:1200px;">
    <button type="button" @click="getPdf">测试</button>
    <button type="button" @click="testfun">测试2</button>

  </div>
</template>

<script>
  import {downloadPDF} from '@/assets/js/htmlToPdf'
  export default {
    name: 'test2-6',
    data() {
      return {

      }
    },
    components: {  },
    methods: {
      testfun(){
        let ele=document.getElementById('pdfDom')
        downloadPDF(this.$el,'测试')
      }
    }
  }
</script>

<style>


</style>
