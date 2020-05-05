<template>
    <div
     v-loading="loading">
        <el-page-header @back="goBack" content="商品详情">
        </el-page-header>
        <div class="lunbo">
             <el-carousel :interval="5000" arrow="always">
                <el-carousel-item v-for="item in productInfo.PRODUCT_PIC" :key="item">
                  <img :src="item" style="width:100%;height:100%">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="info-body">
            <el-card class="box-card">
                <div class="text item">
                   <span class="label">
                        商品名称
                    </span>
                    <span class="text-content pdname">
                        {{productInfo.PRODUCT_NAME}}
                    </span>
                </div>
                <div class="text item">
                   <span class="label">
                        商品价格
                    </span>
                    <span class="text-content pdprice">
                        ￥ <span>{{productInfo.PRODUCT_PRICE}}</span> 
                    </span>
                    <span style="float:right" @click="upadteCollect()">
                       <i class="el-icon-star-off" v-if="!isCollect"></i>
                       <i class="el-icon-star-off isCollect" v-else></i>
                       收藏
                    </span>
                </div>
                <div class="text item">
                   <span class="label">
                        商品数量
                    </span>
                    <span class="text-content">
                        {{productInfo.PRODUCT_NUM}}
                    </span>
                </div>
                <div class="text item">
                   <span class="label">
                        商品类型
                    </span>
                    <span class="text-content">
                        {{translateType2(productInfo.PRODUCT_CLASS)}}
                    </span>
                </div>
                 <div class="text item">
                   <span class="label">
                        卖家
                    </span>
                    <span class="text-content">
                        {{productInfo.SELLER_NAME}}
                    </span>
                </div>
                 <div class="text item">
                   <span class="label">
                        卖家宿舍
                    </span>
                    <span class="text-content">
                        {{productInfo.SELLER_DORM}}
                    </span>
                </div>
                 <div class="text item">
                   <span class="label">
                        联系电话
                    </span>
                    <span class="text-content">
                        {{productInfo.SELLER_PHONE}}
                    </span>
                </div>
                 <div class="text item">
                   <span class="label">
                        微信
                    </span>
                    <span class="text-content">
                        {{productInfo.SELLER_WECHAT}}
                    </span>
                </div>
                 <div class="text item">
                   <span class="label">
                        班级
                    </span>
                    <span class="text-content">
                        {{productInfo.SELLER_CLASS}}
                    </span>
                </div>
                 <div class="text item">
                   <span class="label">
                        发布日期
                    </span>
                    <span class="text-content">
                        {{productInfo.RELEASE_DATE}}
                    </span>
                </div>
                <div style="height:auto;line-height:50px">
                   <span class="label">
                        商品描述
                    </span>
                    <div style="font-size:16px;line-height:25px">
                        {{productInfo.DESCRIBE}}
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
const {getProductInfo,userSearch,modifyUser} = require('../api');
const {translateType,lookCookie} = require('../utils');
var path = '';
export default {
    data(){
        return{
           backUrl:path,
           productId:'',
           productInfo:{},
           loading:false,
           usercollect:[],
           isCollect:false,
           userId:''
        }
    },
    async created(){
        this.loading = true;
        this.productId = this.$route.query.id;
        let {data} =await getProductInfo(this.productId);
        this.productInfo = data[0];
        let username = lookCookie('userName');
        this.userId = lookCookie('userId');
        if(username){
            let data2 = await userSearch({keywords:username});
            window.console.log(data2);
            this.usercollect = data2.data[0].USER_COLLECT;
            let pdid = this.productId;
            let iscl = this.isCollect;
            this.usercollect.map(function(item){
                if(item==pdid){
                    iscl = true;
                }
            })
            this.isCollect = iscl;
        }
        this.loading = false;
    },
    beforeRouteEnter(to,from,next){
        path = from.fullPath
        next();
    },
    methods:{
        goBack(){
          this.$router.push(this.backUrl);
        },
         translateType2(val){
            return translateType(val);
        },
        async upadteCollect(){
           if(this.userId){
                if(this.isCollect){
                  this.usercollect= this.usercollect.filter((item)=>{
                       return item!=this.productId;
                   })
                }else{
                    this.usercollect.push(this.productId);
                }
                this.isCollect = !this.isCollect;
                modifyUser({id:this.userId,usercollect:this.usercollect});
           }else{
               this.$notify({
                    title: '不可收藏',
                    message: `请先登录,登陆之后才可以收藏商品哦`,
                    type: 'warning'
                });
           }
        }
    }
}
</script>
<style lang="scss" scoped>
.isCollect{
    color: red !important;
}
 .el-page-header{
        padding:3vw;
        height: 44px;
        line-height: 44px;
        background: #fff;
        font-size: 17px;
    }
.lunbo::v-deep .el-carousel__container{
  height: 35vh;
}
.info-body{
    .text.item{
        height: 50px;
        line-height: 50px;
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .pdname{
            font-size: 16px;
            color: #262626;
            font-weight: 700;
        }
        .pdprice{
            font-size: 16px;
            color: #f2270c;
            span{
                font-size: 20px;
                font-weight: 600;
            }
        }
        &::after{
            content: '';
            border-color: #f2f2f2;
            height: 0;
            display: block;
            border-top: 1px solid #ddd;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
        }
        &:last-child::after{
            display: none;
        }
    }
    .label{
        color: #262626;
        font-weight: 700;
        display: inline-block;
        width: 70px;
        margin-right: 10px;
    }
    .text-content{
        color: #333;
    }
}
</style>