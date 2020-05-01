<template>
     <div>
    <ul
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled">
      <li v-for="item in pdList" :key="item._id" class="list-item">
          <img :src="item.PRODUCT_PIC[0]" :alt="item.PRODUCT_NAME">
          <p class="detail">{{item.PRODUCT_NAME}}</p>
          <span class="price">￥{{item.PRODUCT_PRICE}}</span>
          <span class="time">发布时间：{{item.RELEASE_DATE}}</span>
      </li>
    </ul>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>
<script>
const {getLazyProductList} = require('../api');
const {getProductNum} = require('../api');
export default {
    props:{
        pdSize:Number
    },
    data () {
      return {
        loading:false,
        pdList:[],
        pagenum:1,
        pdNum:999
      }
    },
    async created(){
        let {data}= await getProductNum();
        this.pdNum = data;
        // this.pdList  = await getLazyProductList (5,1);
        // window.console.log(this.pdList);
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
        window.console.log(222);
        this.loading = true
        setTimeout(async () => {
            let data = await getLazyProductList (5,this.pagenum);
            this.pagenum+=1;
            this.pdList=this.pdList.concat(data);
            window.console.log(this.pdList);
          this.loading = false
        }, 2000)
      }
    }
}
</script>
<style lang="scss" scoped>
ul,li{
    list-style: none;
}
.list-item{
    width: 100%;
    height: 330px;
    border-radius: 5px;
    position: relative;
    background-color: #fff;
    box-shadow: 0 0 8px 0 #00000014;
    margin-bottom: 15px;
    img{
        width: 100%;
        height: 245px;
        border-radius: 5px 5px 0 0;
    }
    .detail{
        margin: 10px;
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