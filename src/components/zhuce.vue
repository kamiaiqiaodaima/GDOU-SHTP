<template>
<div class="zhuce">


<el-container>
  <el-header>用户注册</el-header>
    <el-main style="overflow:auto;">   
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="Username">
                <el-input v-model="ruleForm.Username"></el-input>
            </el-form-item>
            <el-form-item label="宿舍" prop="dorm">
                <el-input v-model="ruleForm.dorm"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="班级" prop="grade">
                <el-input v-model="ruleForm.grade"></el-input>
            </el-form-item>
            <el-form-item label="学号" prop="studynum">
                <el-input v-model="ruleForm.studynum"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-main>
</el-container>
 </div>
</template>
<script>
const {checkname,checksno,createuser} = require('../api');
export default {
     data() {
         var checkUsername = (rule, value, callback) => {
        if (!value.trim()) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(async () => {
          if (value.length<3||value.length>8) {
            callback(new Error('用户名应为3到8位字符'));
          } else {
              let data =await checkname(value);
              window.console.log(data);
              if(data.data===0){
                  callback(); 
              }else{
                  callback(new Error('用户名已存在，请重新命名')); 
              }
              
            }
        }, 1000);
      };
         var validatePass = (rule, value, callback) => {
        if (value.trim()<6) {
          callback(new Error('密码必须为6位以上'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
         var validatePass2 = (rule, value, callback) => {
        if (value.trim() === '') {
          callback(new Error('请再次输入密码'));
        } else if (value.trim() !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
         var checkdorm = (rule,value,callback)=>{//宿舍验证
        if(!(/^[\u4e00-\u9fa5]{2}\S{2}\d{1,3}$/.test(value.trim()))){
            callback(new Error('请输入宿舍号,例:海安A309,海滨1栋104'));
        }else{
            callback();
        }
      };
         var checkphone = (rule,value,callback)=>{//手机号验证
        if(!(/^1[3456789]\d{9}$/.test(value.trim()))){
            callback(new Error('请输入正确的手机号'));
        }else{
            callback();
        }
      };
         var checkgrade = (rule,value,callback)=>{//班级验证
        if(!(/^[\u4e00-\u9fa5]{2}\d{4}$/.test(value.trim()))){
            callback(new Error("专业+班别,例:'信计1161'"));
        }else{
            callback();
        }
      };
         var checkstudynum =async (rule,value,callback)=>{//学号验证
        if(!(/^20\d{10}$/.test(value.trim()))){
            callback(new Error('请输学号,例如201611921119'));
        }else{
            let data = await checksno(value);
            window.console.log(data);
            if(data.data===1){
              callback(new Error('该学号已被人注册,若不是本人操作,请联系管理员'));
            }else{
              callback();
            }
        }
      }
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          Username: '',//用户名
          dorm:'',//宿舍
          phone:'',//手机
          grade:'',//班级
          studynum:'',//学号
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          Username: [
            { validator: checkUsername, trigger: 'blur' }
          ],
          dorm:[{
              validator: checkdorm, trigger: 'blur' 
          }],
          phone:[{ validator: checkphone, trigger: 'blur' }],
          grade:[{ validator: checkgrade, trigger: 'blur' }],
          studynum:[{ validator: checkstudynum, trigger: 'blur' }]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {//表单全正确，valid为true
          let {pass,Username,dorm,phone,grade,studynum} = this.$data.ruleForm;
           let data = await createuser({pass,username:Username,dorm,phone,grade,studynum});
            window.console.log(data);
          } else {
            window.console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>
<style lang="scss" scoped>
.el-main{
   height:calc(100vh - 113px);
}
.zhuce::v-deep .el-header{
    line-height: 60px;
    text-align: center;
    font-size: 5vw;
}
::v-deep .el-form-item__label{
  width: 70px !important;
}
::v-deep .el-form-item__content{
  margin-left: 70px !important;
  padding-right: 5vw;
}
</style>