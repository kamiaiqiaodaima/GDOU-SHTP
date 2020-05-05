<template>
  <div>
   <component @changePage = changePage :is="currentpage"></component>
    <navjump/>
  </div>
</template>

<script>
const navjump = ()=>import('../components/shouye/navjump.vue');
const mine = ()=>import('../components/mine.vue');
export default {
  data(){
    return{
      currentpage:''
    }
  },
  components:{
    navjump,
    mine
  },
  mounted(){
    this.currentpage = "mine"
  },
  methods:{
    changePage(val){
      this.currentpage = val;
    }
  }
}
</script>

<style scoped>

</style>