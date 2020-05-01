<template>
  <div>
    <div class="navMenu">
      <el-menu
        default-active="0"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item v-for="(item,idx) in pdTypeList" :key="item._id" :index="idx">
          <span slot="title">{{item.NAME}}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <navjump/>
  </div>
</template>

<script>
const navjump = ()=>import('../components/shouye/navjump.vue');
const {getProductType} = require('../api');
export default {
  data(){
    return{
      pdTypeList:[]
    }
  },
  async created(){
      let {data} = await getProductType();
      this.pdTypeList = data;
  },
  components:{
    navjump
  },
  methods: {
}
}
</script>
<style lang="scss" scoped>
.navMenu{
  height: 100vh;
  float: left;
  width: 20vw;
  &>ul{
    height: 100%;
  }
  .el-menu-item{
    padding: 0 !important;
    text-align: center;
  }
}
</style> 