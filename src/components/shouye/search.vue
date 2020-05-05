<template>
    <div>
        <div class="head">
            <i class="el-icon-arrow-left" @click="goto('/shouye')"></i>
            <div class="search">
                <i class="el-icon-search" @click="getSearchList"></i>
                <input v-model="searchcontent" @keyup.enter="getSearchList" type="text" placeholder="请输入想要搜索的内容">
            </div>
            <el-button type="primary" @click="getSearchList">搜索</el-button>
        </div>
        <div class="box-body"
        v-loading="loading">
               <ul class="search-list" v-if="searchList.length>0">
                   <li v-for="item in searchList" :key="item._id" @click="godetail(item._id)">
                       <img :src="item.PRODUCT_PIC[0]">
                       <div class="info">
                           <div class="title">{{item.PRODUCT_NAME}}</div>
                           <div class="type">{{translateType2(item.PRODUCT_CLASS)}}</div>
                           <div class="price">￥<span>{{item.PRODUCT_PRICE}}</span></div>
                           <div class="seller">{{item.SELLER_NAME}}</div>
                       </div>
                   </li>
               </ul>
                <div class="nodata" v-else>
                    <i class="el-icon-box"></i>
                    <div>抱歉！暂无相关商品</div>
                </div>
        </div>
    </div>
</template>
<script>
const {searchProduct} = require('../../api');
const {translateType} = require('../../utils');
export default {
    data(){
        return{
           searchcontent:'',
           loading:false,
           searchList:[]
        }
    },
    methods:{
        goto(val){
            this.$router.push(val);
        },
        async getSearchList(){
            this.loading = true;
            let {data}= await searchProduct(this.searchcontent);
            if(data.constructor==Array){
               this.searchList = data;
            }else{
               this.searchList = [];
            }
            this.loading = false;
        },
        translateType2(val){
            return translateType(val);
        },
        godetail(val){
            this.$router.push({path:'/productDetail',query:{id:val}})
        }
    }
}
</script>
<style lang="scss" scoped>
.nodata{
  padding-top: 106px;
  text-align: center;
  color: #E8E8E8;
  font-size: 14px;
  i{
    font-size: 64px;
  }
}
.box-body{
    padding-top: 50px;
    height: 100vh;
    box-sizing: border-box;
}
.search-list{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 10px 10px 0;
    overflow: auto;
    height: 100%;
    background-color: #f7f7f7;
    li{
        flex: 1;
        flex-basis: 48%;
        max-width: 49.4%;
        background-color: #fff;
        margin-bottom: 10px;
        overflow: hidden;
        &:hover{
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        }
        img{
            width: 100%;
            height: 250px;
        }
        .info{
            min-height: 80px;
            padding: 0 10px 10px 10px;
            .title{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: block;
                height: 19px;
                margin-top: 8px;
                font-size: 14px;
            }
            .type{
                display: inline-block;
                padding: 0 5px;
                border-radius: 5px;
                font-size: 10px;
                height: 15px;
                line-height: 15px;
                color: #999;
                background-color: #f2f2f7;
            }
            .price{
                font-size: 10px;
                font-weight: 400;
                color: #e93b3d;
                span{
                font-weight: 400;
                font-size: 18px;
                }
            }
            .seller{
                color: #999;
                font-size: 12px;
            }
        }
    }
}
.head{
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    .el-icon-arrow-left{
        padding: 0 10px;
        font-size: 20px;
    }
    .el-button--primary{
        box-sizing: border-box;
        padding: 6px;
        margin: 6px;
        margin-right: 10px;
    }
}
.search{
    flex: 1;
    border-radius: 5vw; 
    border: none;
    margin-left: 6px;
    height: 30px;
    background: #f7f7f7;
    position: relative;
    .el-icon-search{
        position: absolute;
        top: 7px;
        left: 14px;
    }
    input{
        height: 100%;
        border: none;
        outline: none;
        margin-left: 2vw;
        background: transparent;
        font-size: 12px;
        color: #232326;
        margin: 0 0 0 5px;
        vertical-align: middle;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        line-height: 30px;
        box-sizing: border-box;
        padding: 0 16px 0 35px;
    }
}
</style>