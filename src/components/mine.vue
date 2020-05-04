<template>
    <div>
        <div class="head" v-show="isLog">
            <el-avatar :size="70" :src="PicUrl" style="box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.7);"></el-avatar>
            <div style="margin-top:10px;font-weight:600">{{username}}</div>
        </div>
        <div class="box-body"  v-show="isLog">
           <el-card class="box-card">
                <div v-for="item in navList"  @click="goto(item.click)" :key="item.name" class="text item">
                   <i :class="item.class" style="margin-right:3vw"></i> 
                   {{item.name}}
                   <i class="el-icon-arrow-right"></i>
                </div>
            </el-card>
        </div>
        <div class="nolog" v-show="!isLog">
            <img src="../assets/wdl.jpg">
            <div style="margin-bottom:9vh;font-size:1rem;">抱歉~,您还未登录,请选择以下操作</div>
            <el-button type="primary" style="margin-bottom:5vh" @click.native="goto('log')">用户登录</el-button>
            <el-button type="primary" style="margin-left:0" plain @click.native="goto('zhuce')">用户注册</el-button>
        </div>
    </div>
</template>
<script>
const {lookCookie,removeCookie} = require('../utils');
export default {
    data(){
        return {
            isLog:false,
            PicUrl:require('../assets/gdoupic.jpg'),
            username:'',
            navList:[
                {
                    class:'el-icon-edit',
                    name:'修改个人信息',
                    click:'modifyPersonalInf'
                },
                {
                    class:'el-icon-present',
                    name:'个人商品管理',
                    click:'MUProduct'
                },
                {
                    class:'el-icon-user-solid',
                    name:'退出当前用户',
                    click:'logOut'
                }
            ]
        }
    },
    created(){
        let userId = lookCookie("userId");
        if(userId&&userId!='undefined'){
            this.username = lookCookie("userName")
            this.isLog = true;
        }
    },
    methods:{
        goto(val){
            if(val == 'logOut'){
                removeCookie('userId');
                this.isLog = false;
            }else{
                this.$router.push('/user/'+val);
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.head{
    text-align: center;
    padding-top: 20px;
    height: 20vh;
    background: url("../assets/gdoudoor.jpg") no-repeat;
    background-size: cover;
    margin-bottom: 20px;
}
.box-card {
    height: calc(80vh - 110px);
  }
.text.item{
    height: 7vh;
    line-height: 7vh;
    border-bottom: 1px solid #ccc;
    font-size: 1rem;
    i{
        color: #44cdb1;
    }
    .el-icon-arrow-right{
        float: right;
        line-height: 7vh;
        color: #303133;
    }
  }
  .nolog{
      height: calc(100vh - 53px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &>img{
          border-radius: 50%;
          width: 20vh;
          height: 20vh;
          margin-bottom: 1vh;
      }
      .el-button{
         width: 50%;
      }
  }
</style>