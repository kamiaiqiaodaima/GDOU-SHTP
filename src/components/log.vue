<template>
    <div class="box" v-loading="loading">
        <el-page-header @back="goBack" content="用户登录">
        </el-page-header>
        <el-container>
            <el-main style="overflow:auto;">   
                <el-form label-position="left" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
        <div class="footer" style="margin-top:5v">
              <el-carousel height="200px" indicator-position="none" :interval="4000" type="card">
                <el-carousel-item v-for="item in imgList"  :key="item.imgSrc">
                <img :src="item.imgSrc" style="width:100%">
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>
<script>
import { userLog } from '../api';
const {setCookie} = require('../utils');
export default {
    data(){
        var checkname = (rule,value,callback)=>{
           if(!value||!value.trim()){
               callback(new Error('用户名不能为空'));
           }else{
               callback();
           }
        };
        var checkpassword = (rule,value,callback)=>{
           if(!value||!value.trim()){
               callback(new Error('密码不能为空'));
           }else{
               callback();
           }
        };
        return{
            loading:false,
            imgList:[{
                imgSrc:require("../assets/gdoudoor.jpg")
            },{
                imgSrc:require("../assets/gdoubuilding.jpg")
            },{
                imgSrc:require("../assets/gdou1.jpg")
            },{
                imgSrc:require("../assets/gdou2.jpg")
            },{
                imgSrc:require("../assets/gdou3.jpg")
            },],
            ruleForm:{
                username:'',
                password:''
            },
            rules:{
                username:[
                    {
                        validator: checkname
                    }
                ],
                password:[
                    {
                        validator: checkpassword
                    }
                ]
            }
        }
    },
    methods:{
        async submitForm () {
           this.loading = true;
           let {username,password} = this.$data.ruleForm;
           let {data} = await userLog({username,password});
           if(data.length>0){
                 setCookie ('userId',data[0]._id,1);
                 setCookie ('userName',data[0].USER_NAME,1);
                 this.loading = false;
                 this.$router.push("/user");
           }else{
               this.loading = false;
               this.$notify({
                    title: '登录失败',
                    message: `请检查信息是否填写正确和完整`,
                    type: 'warning'
               })
           }
        },
        goBack(){
            this.$router.push("/user");
        }
    }
}
</script>
<style lang="scss" scoped>
.box{
    text-align: left;
    background: #fff;
    .el-page-header{
        padding:3vw;
        height: 44px;
        line-height: 44px;
        background: #fff;
        font-size: 17px;
    }
}
::v-deep .el-form-item__label{
    width: 60px !important;
}
::v-deep .el-form-item__content{
    margin-left: 60px !important;
}
</style>