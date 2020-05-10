
    <template>
        <div style="margin-top:50px;width:600px;margin-left:20%">
            <h1 style="margin-bottom:50px;">用户信息添加</h1>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" >
        <el-form-item label="用户" prop="user" style="color:#000">
            <el-input type="text" v-model="ruleForm.user" autocomplete="off"
            placeholder="请输入用户"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="text" v-model="ruleForm.password" 
            placeholder="请输入用户密码"
            autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
        </el-form>
        </div>
    </template>
    <script>
    export default {
        data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入用户'));
            } else {
            callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            callback();
            }
        };
        return {
            ruleForm: {
            user: '',
            password: '',
            },
            rules: {
            user: [
                { validator: validatePass, trigger: 'blur' }
            ],
            password: [
                { validator: validatePass2, trigger: 'blur' }
            ],

            }
        };
        },
        methods: {
            submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
            if (valid) {
                let{user,password} = this.ruleForm;
                // console.log(user,password)
                let {data} =await this.$instance.post('/user/reg',{
                        username:user,
                        password
                });
                // console.log(data)
                if(data.code ===1){
                    alert('successfully!!!')
                    //清空输入框
                    this.ruleForm.user='';
                    this.ruleForm.password='';
                }else{
                    alert('failed!!!')
                }
            } else {
                // console.log('error submit!!');
                return false;
            }
            });
        }
        }
    }
    </script>
<style lang="scss" scoped>
    .el-form-item__label{
        color:black !important;
    }
</style>