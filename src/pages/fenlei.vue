<template>
  <div class="box">
    <div class="navMenu">
      <el-menu
        v-loading="typeloading"
        style="overflow:auto"
        default-active="0"
        class="el-menu-vertical-demo"
        background-color="#f8f8f8"
        text-color="#333"
        active-text-color="#44cdb1">
        <el-menu-item v-for="(item,idx) in pdTypeList" 
        :key="item._id" 
        :index="idx.toString()"
        @click = navLick(item)>
          <span slot="title">{{item.NAME}}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div 
     class="infinite-list-wrapper productList" 
     style="overflow:auto">
      <h3>{{nowTypeName}}</h3>
      <ul
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled">
      <li v-for="item in nowTypeList" :key="item._id" class="list-item">
          <img :src="item.PRODUCT_PIC[0]" :alt="item.PRODUCT_NAME">
          <div class="name">{{item.PRODUCT_NAME}}</div>
      </li>
    </ul>
    <div class="nodata" v-if="nodata">
      <i class="el-icon-box"></i>
      <div>该类没有商品</div>
    </div>
    <p v-if="noMore">没有更多了</p>
    </div>
    
    <navjump/>
  </div>
</template>

<script>
const navjump = ()=>import('../components/shouye/navjump.vue');
const {getProductType,getLazyProductList,getProductNum} = require('../api');
export default {
  data(){
    return{
      pdTypeList:[],
      typeloading:true,
      loading:false,
      nowTypeName:'数码',
      nowType:"digital",
      nowTypeList:[],
      pagenum:1,
      pdNum:999,
      nodata:false
    }
  },
  async created(){
      let {data} = await getProductType();
      this.pdTypeList = data;
      this.typeloading=false;
      let num = await getProductNum();
      this.pdNum = num.data
  },
  computed: {
      noMore () {
        return this.nowTypeList.length >= this.pdNum
      },
      disabled () {
        return this.loading || this.noMore
      }
  },
  components:{
    navjump
  },
  methods: {
    load () {
        this.loading = true
        window.console.log(12312)
        setTimeout(async () => {
            let data = await getLazyProductList (10,this.pagenum,this.nowType);
            this.nowTypeList = this.nowTypeList.concat(data);
            this.pagenum+=1;
            this.nowTypeList.length<=0?this.nodata=true:this.nodata=false
            this.loading = false;
        }, 0.1)
      },
    navLick(item){
       window.console.log(item);
       this.nowTypeList = [];
       this.nodata = false;
       this.nowTypeName = item.NAME;
       this.nowType = item.TYPE;
       this.pagenum = 1;
       this.load();
    }
}
}
</script>
<style lang="scss" scoped>
.box{
  display: flex;
  ul,li{
    list-style: none;
  }
}
.el-menu-item.is-active{
  background-color: #fff !important;
}
.navMenu{
  height: calc(100vh - 53px);
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
.productList{
  flex: 1;
   height: calc(100vh - 53px);
  .list-item{
    width: 32.8%;
    float: left;
    text-align: center;
    img{
     width: 70px;
     height: 70px;
    }
    .name{
      color: #333;
      height: 35px;
      margin-top: 2px;
      -webkit-box-pack: start;
      font-size: 12px;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
   &>ul{
     display: flex;
     flex-wrap: wrap;
     min-height: 80px;
   }
   &>h3{
     height: 50px;
     line-height: 50px;
    text-align: center;
    font-weight: 530;
   }
}
.nodata{
  padding-top: 106px;
  text-align: center;
  color: #E8E8E8;
  font-size: 14px;
  i{
    font-size: 64px;
  }
}
</style> 