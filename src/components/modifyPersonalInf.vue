<template>
<div class="zhuce">
<el-page-header @back="goBack" content="修改个人信息">
   </el-page-header>
<el-container v-loading='loading'>
    <el-main style="overflow:auto;">   
        <el-form :model="ruleForm"  status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="Username">
                <el-input v-model="ruleForm.Username"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="微信号码" prop="wechat">
                <el-input v-model="ruleForm.wechat"></el-input>
            </el-form-item>
            <el-form-item label="宿舍" prop="dorm">
                <el-input v-model="ruleForm.dorm"></el-input>
            </el-form-item>
            <el-form-item label="班级" prop="grade">
                <el-input v-model="ruleForm.grade"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="copyright">
            <div class="ts">温馨提示</div>
          用户信息修改,只要填写对应表单信息点击确认修改即可成功修改对应信息
        </div>
    </el-main>
</el-container>
 </div>
</template>
<script>
const {modifyUser,checkname,checkuserphone,checkuserwechat,userSearch} = require('../api');
const {lookCookie} = require('../utils');
export default {
     data() {
          var checkUsername = (rule, value, callback) => {
              if(value){
                  setTimeout(async () => {
                    if (value.length<3||value.length>8) {
                      callback(new Error('用户名应为3到8位字符'));
                    } else {
                        let data =await checkname(value);
                        if(data.data===0){
                            callback(); 
                        }else{
                            callback(new Error('用户名已存在，请重新命名')); 
                        }
                      }
                  }, 1000);
              }else{
          callback();
      }
      };
       var validatePass = (rule, value, callback) => {
        if (value && value.trim()<6) {
          callback(new Error('密码必须为6位以上'));
        }else{
          callback();
      }
      };
       var checkdorm = (rule,value,callback)=>{//宿舍验证
       if(value){
           if(!(/^[\u4e00-\u9fa5]{2}\S{0,2}\d{3,6}$/.test(value.trim()))){
               callback(new Error('请输入宿舍号,例:海安A309,海滨1栋104'));
           }else{
               callback();
           }
       }else{
          callback();
      }
      };
      var checkphone = async (rule,value,callback)=>{//手机号验证
      if(value){
          if(!(/^1[3456789]\d{9}$/.test(value.trim()))){
              callback(new Error('请输入正确的手机号'));
          }else{
              let {data} = await checkuserphone(value);
              if(data==1){
                  callback(new Error('该手机号已被注册,若有问题请联系管理员'));
              }else{
                callback();
              }
          }
      }else{
          callback();
      }
      };
       var checkgrade = (rule,value,callback)=>{//班级验证
       if(value){
           if(!(/^[\u4e00-\u9fa5]{2,}\d{4}$/.test(value.trim()))){
               callback(new Error("专业+班别,例:'信计1161'"));
           }else{
               callback();
           }
       }else{
          callback();
      }
      };
       var checkwechat = async (rule,value,callback)=>{//微信号
        if(value){
                let {data} = await checkuserwechat(value);
                if(data==1){
                    callback(new Error('该微信号已被注册,若不是本人操作,请联系管理员'));
                }else{
                    callback();
                }
        }else{
          callback();
      }
      }
      return {
        loading:false,
        ruleForm: {
          pass: '',
          Username: '',//用户名
          dorm:'',//宿舍
          phone:'',//手机
          grade:'',//班级
          wechat:''//微信号
        },
           rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          Username: [
            { validator: checkUsername, trigger: 'blur' }
          ],
          dorm:[{
              validator: checkdorm, trigger: 'blur' 
          }],
          phone:[{ validator: checkphone, trigger: 'blur' }],
          grade:[{ validator: checkgrade, trigger: 'blur' }],
          wechat:[{validator: checkwechat, trigger: 'blur'}]
        }
      };
    },
    async created(){
        this.loading = true;
        let username = lookCookie('userName');
        let {data} = await userSearch({keywords:username});
        this.ruleForm.Username = data[0].USER_NAME;
        this.ruleForm.pass = data[0].USER_PSW;
        this.ruleForm.dorm = data[0].USER_DORM;
        this.ruleForm.phone = data[0].USER_PHONE;
        this.ruleForm.grade = data[0].USER_CLASS;
        this.ruleForm.wechat = data[0].USER_WECHAT;
        this.loading = false;
    },
    methods: {
      async submitForm(formName) {
          this.loading = true;
           this.$refs[formName].validate(async (valid) => {
               if(valid){
                   let {pass,Username,dorm,phone,grade,wechat} = this.$data.ruleForm;
                //    window.console.log({pass,Username,dorm,phone,grade,wechat})
                   let id = lookCookie('userId');
                   if(id){
                       let {data} = await modifyUser({
                         id:id,
                         username:Username,
                         userpsw:pass,
                         userdorm:dorm,
                         userphone:phone,
                         userwechat:wechat,
                         userclass:grade,
                       });
                       if(data.modifiedCount>0){
                           this.$notify({
                             title: '修改成功',
                             message: `恭喜你，您的信息修改成功`,
                             type: 'success'
                         });
                       }
                   }else{
                       this.$notify({
                           title: '请先登录用户',
                           message: `用户未登录`,
                           type: 'warning'
                         });
                   }
               }
           });
           this.loading = false;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      goBack(){
        this.$router.push('/user')
      }
    }
}
</script>
<style lang="scss" scoped>
.el-main{
   height:calc(100vh - 113px);
}
.zhuce::v-deep .el-page-header{
    padding: 3vw;
    height: 44px;
    line-height: 44px;
    background: #fff;
    font-size: 17px;
}
::v-deep .el-form-item__label{
  width: 70px !important;
}
::v-deep .el-form-item__content{
  margin-left: 70px !important;
  padding-right: 5vw;
}
::v-deep .el-input__inner{
  height: 30px;
}
.copyright{
    text-align: center;
    font-size: 14px;
    .ts{
        font-weight: 600;
        font-size: 16px;
    }
}
</style>