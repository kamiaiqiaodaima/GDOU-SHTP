<template>
    <div>
        <div class="head">
           <el-page-header @back="goto('/user')" content="我发布的商品">
           </el-page-header>
           <el-button type="primary" @click="goMUProduct()" >发布新商品<i class="el-icon-plus el-icon--right"></i></el-button>
        </div>
        <div class="box-body"
        v-loading="loading">
               <ul class="search-list" v-if="sellProductList.length>0">
                   <li v-for="item in sellProductList" :key="item._id" @click="goMUProduct(item._id)">
                       <img :src="item.PRODUCT_PIC[0]">
                       <div class="soldout" v-if="compareTime2(item.DEADLINE)">已过截止时间,不在其它页面展示</div>
                       <div class="info">
                           <div class="title">{{item.PRODUCT_NAME}}</div>
                           <div class="type">{{translateType2(item.PRODUCT_CLASS)}}</div>
                           <div class="price">￥<span>{{item.PRODUCT_PRICE}}</span></div>
                           <div class="seller">
                               {{item.SELLER_NAME}}
                           </div>
                            <el-button type="danger" style="float:right;padding:8px" @click.stop="delPd(item._id)">下架该商品</el-button>
                       </div>
                   </li>
               </ul>
                <div class="nodata" v-else>
                    <i class="el-icon-box"></i>
                    <div>抱歉！暂无发布商品</div>
                </div>
        </div>
    </div>
</template>
<script>
const {getSellProduct,delProduct} = require('../api');
const {translateType,lookCookie,compareTime} = require('../utils');
export default {
    data(){
        return{
           searchcontent:'',
           loading:false,
           sellProductList:[]
        }
    },
    async created(){
        this.loading = true;
        let userid = lookCookie("userId");
        let {data} = await getSellProduct(userid);
        if(data.constructor == Array){
             this.sellProductList = data;
        }else{
            this.sellProductList =[]
        }
        this.loading =false;
        window.console.log(data);
    },
    methods:{
        async delPd(id){
            this.loading = true;
            let data = await delProduct(id);
            if(data.code==1){
               this.sellProductList= this.sellProductList.filter((item)=>{
                    return item._id != id;
                })
                this.$notify({
                    title: '下架成功',
                    message: `您的商品已成功下架`,
                    type: 'success'
                });
            }else{
                this.$notify({
                    title: '下架失败',
                    message: data.data,
                    type: 'warn'
                });
            }
            this.loading =false;
        },
        goto(val){
            this.$router.push(val);
        },
        translateType2(val){
            return translateType(val);
        },
        goMUProduct(val){
            if(val){
                this.$router.push(
                    {path:'/user/personalProduct/MUProduct',
                    query:{id:val}
                    })
            }else{
                this.$router.push('/user/personalProduct/MUProduct')
            }
        },
        compareTime2(val){
        return compareTime(val);
      }
    }
}
</script>
<style lang="scss" scoped>
.head{
    position: relative;
    .el-button{
        position: absolute;
        right: 2vw;
        top: 15px;
        height: 37px;
        width: 125px;
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
.box-body{
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
        height: 386px;
        overflow: hidden;
        position: relative;
        .soldout{
            position: absolute;
            top: 0;
            width: 100%;
            height: 250px;
            text-align: center;
            line-height: 250px;
            background-color: rgba(0,0,0,0.4);
            color: #fff;
        }
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
            overflow: hidden;
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
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
}
::v-deep .el-page-header{
    padding: 3vw;
    height: 44px;
    line-height: 44px;
    background: #fff;
    font-size: 17px;
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