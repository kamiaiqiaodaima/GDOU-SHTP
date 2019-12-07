<template>
  <div>
    <div class="top-part">
      <header>
        <search/>
        <div class="fenlei">
          <img :src="fenlei" alt="分类按钮">
          <p>分类</p>
        </div>
      </header>
      <div class="lunbo">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <navjump/>
    </div>
  </div>
</template>

<script>
const navjump = ()=>import('../components/navjump.vue');
const search = ()=>import('../components/search');
export default {
  data(){
    return{
        fenlei:require('../assets/flh02.png')

    }
  },
  components:{
    navjump,
    search
  }
}
</script>

<style lang='scss' scoped>
.top-part{
  height:calc(100vh - 53px);
  background-color: #44cdb1;
  padding: 0 4vw;
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
///////////////////
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  /////////////////

</style>
