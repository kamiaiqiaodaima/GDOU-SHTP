<template>
  <div 
  v-loading="loading">
    <el-card class="box-card" v-if="hasCollect">
      <div slot="header" class="clearfix">
        <span>收藏</span>
        <el-button @click="delCollect" style="float: right; padding: 3px 0" type="text">删除</el-button>
      </div>
      <el-checkbox-group v-model="checkList">
      <div v-for="item in collectList" @click="godetail(item._id)" v-show="compareTime2(item.DEADLINE)" :key="item._id" class="text item scbox">
            <el-checkbox :label="item._id" style="float:left"></el-checkbox>
           <img :src="item.PRODUCT_PIC[0]" class="scimg">
           <div class="content">
             <div class="name">
               {{item.PRODUCT_NAME}}
             </div>
             <div class="sellerName">
               卖家：{{item.SELLER_NAME}}
             </div>
             <div>
               联系电话：{{item.SELLER_PHONE}}
             </div>
             <div class="price">
               ￥{{item.PRODUCT_PRICE}}
             </div>
           </div>
      </div>
      </el-checkbox-group>
    </el-card>
    <div class="shopcart_empty_wrap" v-else>
      <div class="el-icon-collection"></div> 
      <p class="empty_txt">{{hasCollectText}}</p>
      </div>
    <navjump/>
  </div>
</template>

<script>
const navjump = ()=>import('../components/shouye/navjump.vue');
import { usercollect,modifyUser } from '../api';
const {lookCookie,compareTime} = require('../utils');
export default {
  data(){
    return{
      checkList:[],
      collectList:[],
      loading:false,
      hasCollect:true,
      hasCollectText:'登录后可同步购物车中商品',
      userId:''
    }
  },
  components:{
    navjump
  },
  async created(){
    let userId = lookCookie("userId");
    this.userId = userId;
    this.loading = true;
    if(userId){
      let {data} = await usercollect({id:userId});
      window.console.log(data);
      if(data.length>0){
         this.collectList = data;
      }else{
        this.hasCollect = false;
        this.hasCollectText ='赶紧去逛逛吧！您暂时还没有收藏商品'
      }
    }else{
      this.hasCollect = false;
    }
   this.loading = false;
  },
  methods:{
   delCollect(){
     this.loading = true;
     let checkList = this.checkList;
     let newCollcetList = this.collectList.filter(function(item){
         let isok = true;
         checkList.forEach(function(item2){
           if(item._id==item2){
             isok = false;
           }
         })
         if(isok){return item}
     })
     let newCollcetIdList = newCollcetList.map(function(item){
       return item._id
     })
     modifyUser({id:this.userId,usercollect:newCollcetIdList});
      this.collectList = newCollcetList;
      this.loading = false;
   },
   compareTime2(val){
        return compareTime(val);
      },
    godetail(val){
        this.$router.push({path:'/productDetail',query:{id:val}})
    }
  }
}
</script>

<style lang="scss" scoped>
.shopcart_empty_wrap{
    padding: 30vh 0;
    text-align: center;
    .el-icon-collection{
      font-size: 20vw;
    }
    .empty_txt{
      font-size: 16px;
      color: #333;
      line-height: 16px;
      margin-top: 15px;
    }
}
.scbox{
    z-index: 1;
    position: relative;
    min-height: 100px;
    background: #fff;
    margin-bottom: 2vh;
img.scimg{
    // position: absolute;
    // left: 40px;
    // top: 0;
    float: left;
    display: block;
    width: 100px;
    height: 100px;
    box-shadow: 0 0 18px 0 rgba(0,0,0,.05);
    border-radius: 6px;
    margin: 0 12px;
}
.content{
  float: left;
  font-size: 14px;
  div{
  padding-right: 10px;
  margin-bottom: 3px;
  }
  .name{
    font-size: 16px;
    font-weight: 600;
  }
}
.price{
    font-family: JDZH-Regular;
    line-height: 16px;
    color: #f2270c;
    font-size: 10px;
    font-size: 16px;
}
}
::v-deep .el-checkbox__label{
  display: none;
}
</style>