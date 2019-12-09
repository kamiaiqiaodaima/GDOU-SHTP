<template>
  <div>
   <component :is="currentpage"></component>
    <navjump/>
  </div>
</template>

<script>
const navjump = ()=>import('../components/navjump.vue');
const zhuce = ()=>import('../components/zhuce.vue');
export default {
  data(){
    return{
      currentpage:''
    }
  },
  components:{
    navjump,
    zhuce
  },
  mounted(){
    this.currentpage = "zhuce"
  }
}
</script>

<style scoped>

</style>