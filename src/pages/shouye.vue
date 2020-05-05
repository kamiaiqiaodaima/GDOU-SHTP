<template>
  <div class="infinite-list-wrapper top-part" style="overflow:auto">
    <div>
      <!-- <keep-alive> -->
      <header>
        <div class="search"  @click="goSearch">
          <i class="el-icon-search"></i>
          <input type="text" placeholder="请输入想要搜索的内容">
        </div>
        <div class="fenlei" @click="gofenlei">
          <img :src="fenlei" alt="分类按钮">
          <p>分类</p>
        </div>
      </header>
      <div class="lunbo">
        <el-carousel v-loading="lunboLoading" :interval="5000" arrow="always">
          <el-carousel-item v-for="item in lunboList" :key="item._id" @click.native="godetail(item._id)">
            <img :src="item.PRODUCT_PIC[0]" :alt="item.PRODUCT_NAME" style="width:100%;height:100%">
            <span class="lubolabel">{{item.PRODUCT_NAME}}</span>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- <div class="notice"> 

      </div> -->
      <div class="productList" style="margin-top:15px">
          <product-list
          @godetail='godetail'
          :pdSize="pdSize"/>
      </div>
      <navjump/>
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>
const navjump = ()=>import('../components/shouye/navjump');
const productList = ()=>import('../components/productList');
const {getLunboList} = require('../api');
export default {
  data(){
    return{
        fenlei:require('../assets/flh02.png'),
        lunboList:[],//轮播图列表
        lunboLoading:true,//轮播图的loading
        pdSize:5//加载一次商品的数量

    }
  },
  async created(){
    this.lunboList = await getLunboList();
    this.lunboLoading = false;
  },
  components:{
    navjump,
    productList
  },
  methods:{
    goSearch(){
      this.$router.push('/search');
    },
    godetail(val){
            this.$router.push({path:'/productDetail',query:{id:val}})
    },
    gofenlei(){
      this.$router.push('/fenlei');
    }
  }
}
</script>

<style lang='scss' scoped>
.search{
    border-radius: 5vw; 
    border: none;
    height: 10vw;
    width: 80%;
    margin-right: 5%;
    padding:0 5%;
    background-color: #ffffff;
    input{
        height: 100%;
        border: none;
        width: 90%;
        outline: none;
        margin-left: 2vw;
    }
}
.top-part{
  height:calc(100vh - 53px);
  background-color: #44cdb1;
  padding: 0 4vw;
  margin-bottom: 4vw;
}
header{
height: 5vh;
overflow: hidden;
display: flex;
padding:5vw 0vw 2vw 0vw;
align-items: center;
margin-bottom: 2vw;
.fenlei{
  height: 100%;
  width: 7vw;
  img{
    width: 100%;
    height: 5vw;
  }
  p{
    font-size: 12px;
    line-height: 12px;
  }
}
}
.lunbo::v-deep .el-carousel__container{
  height: 20vh;
  .el-carousel__item{
     border-radius: 2vw;
  }
}
.lubolabel{
    position: absolute;
    top: 82px;
    left: 0;
    width: 100%;
    text-align: center;
    color: rgb(238,238,238);
    background-color: rgba(0,0,0,0.15);
}
///////////////////
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  /////////////////

</style>
