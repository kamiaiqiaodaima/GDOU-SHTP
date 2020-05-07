<template>
     <div>
    <ul
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled">
      <li v-for="item in pdList" v-show="compareTime2(item.DEADLINE)" :key="item._id" @click="godetail2(item._id)" class="list-item">
          <img :src="item.PRODUCT_PIC[0]" :alt="item.PRODUCT_NAME">
          <p class="detail">{{item.PRODUCT_NAME}}</p>
          <span class="price">￥{{item.PRODUCT_PRICE}}</span>
          <span class="time">发布时间：{{item.RELEASE_DATE}}</span>
      </li>
    </ul>
    <div 
    v-if="loading"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    class="loading">

    </div>
    <!-- <p v-if="loading">加载中...</p> -->
    <p v-if="noMore">没有更多了</p>
  </div>
</template>
<script>
const {getLazyProductList,getProductNum} = require('../api');
const {compareTime} = require('../utils');
export default {
    props:{
        pdSize:Number
    },
    data () {
      return {
        loading:false,
        pdList:[],
        pagenum:1,
        pdNum:999,
        nowTime:new Date().getTime()
      }
    },
    async created(){
        let {data}= await getProductNum();
        this.pdNum = data;
    },
    computed: {
      noMore () {
        return this.pdList.length >= this.pdNum
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
    methods: {
      load () {
        this.loading = true
        setTimeout(async () => {
          let data = await getLazyProductList (this.pdSize,this.pagenum);
          this.pagenum+=1;
          this.pdList=this.pdList.concat(data);
          this.loading = false
        }, 0.1)
      },
      godetail2(val){
        this.$emit("godetail",val);
      },
      compareTime2(val){
        return compareTime(val);
      }
    }
}
</script>
<style lang="scss" scoped>
ul,li{
    list-style: none;
}
.loading{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.list-item{
    width: 100%;
    height: 34vh;
    border-radius: 5px;
    position: relative;
    background-color: #fff;
    box-shadow: 0 0 8px 0 #00000014;
    margin-bottom: 15px;
    img{
        width: 100%;
        height: 24vh;
        border-radius: 5px 5px 0 0;
    }
    .detail{
        margin:5px 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: rgba(0, 0, 0, 0.85);
        overflow: hidden;
    }
    .price{
        float: left;
        color: #e1251b;
        padding-left: 10px;
        font-weight: 700;
    }
    .time{
        float: right;
        padding-right: 10px;
    }
}
</style>