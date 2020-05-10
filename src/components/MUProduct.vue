<template>
<div class="zhuce">
<el-page-header @back="goBack" :content="title">
   </el-page-header>
<el-container
 v-loading='loading'>
    <el-main style="overflow:auto;">   
        <el-form :model="ruleForm"  status-icon :rules="rules"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="商品名称" prop="PRODUCT_NAME">
                <el-input v-model="ruleForm.PRODUCT_NAME"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="PRODUCT_PRICE">
                <el-input type="number" v-model="ruleForm.PRODUCT_PRICE"></el-input>
            </el-form-item>
             <el-form-item label="截至时间" prop="DEADLINE">
                <!-- <el-input v-model="ruleForm.DEADLINE"></el-input> -->
                 <el-date-picker
                    v-model="ruleForm.DEADLINE"
                    type="datetime"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="商品数量" prop="PRODUCT_NUM">
                <el-input type="number" v-model="ruleForm.PRODUCT_NUM"></el-input>
            </el-form-item>
            <el-form-item label="商品类别" prop="PRODUCT_CLASS">
                 <el-select v-model="ruleForm.PRODUCT_CLASS" placeholder="请选择">
                    <el-option
                        v-for="item in productType"
                        :key="item.TYPE"
                        :label="item.NAME"
                        :value="item.TYPE">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="卖家称呼" prop="SELLER_NAME">
                <el-input v-model="ruleForm.SELLER_NAME"></el-input>
            </el-form-item>
            <el-form-item label="宿舍" prop="SELLER_DORM">
                <el-input v-model="ruleForm.SELLER_DORM"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="SELLER_PHONE">
                <el-input v-model="ruleForm.SELLER_PHONE"></el-input>
            </el-form-item>
            <el-form-item label="微信号" prop="SELLER_WECHAT">
                <el-input v-model="ruleForm.SELLER_WECHAT"></el-input>
            </el-form-item>
            <el-form-item label="班级" prop="SELLER_CLASS">
                <el-input v-model="ruleForm.SELLER_CLASS"></el-input>
            </el-form-item>
            <el-form-item label="商品描述" prop="DESCRIBE">
                <el-input type="textarea" v-model="ruleForm.DESCRIBE"></el-input>
            </el-form-item>
            <el-form-item v-if="isfb" label="上传图片" prop="PRODUCT_PIC">
                <!-- <el-input type="textarea" v-model="ruleForm.DESCRIBE"></el-input> -->
            <el-upload
                class="upload-demo"
                :action="uploadUrl"
                :on-remove="handleRemove"
                :on-success="handlePreview"
                :file-list="fileList"
                list-type="picture">
                <el-button size="small" type="primary">上传图片</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="submitForm('update')" v-if="!isfb">确认修改</el-button>
                <el-button type="primary" @click="submitForm('release')" v-else>发布商品</el-button>
            </el-form-item>
        </el-form>
        <div class="copyright" v-if="!isfb">
            <div class="ts">温馨提示</div>
          商品信息修改,只要填写对应表单信息点击确认修改即可成功修改对应信息
        </div>
    </el-main>
</el-container>
 </div>
</template>
<script>
var path = '';
const {getProductInfo,getProductType,updateProduct,userSearch,releaseProduct} = require("../api");
const {lookCookie,uploadUrl,dateFormat} = require("../utils");
export default {
     data() {
       var checkSELLER_NAME = (rule,value,callback) =>{
           if(value){
                  setTimeout(async () => {
                    if (value.length<3||value.length>8) {
                      callback(new Error('用户名应为3到8位字符'));
                    } else {
                        callback();
                    }
                  }, 1000);
              }else{
                    callback(new Error('不能为空'));
                }
        };
        var checkSELLER_DORM = (rule,value,callback) =>{
           if(value){
                  if(!(/^[\u4e00-\u9fa5]{2}\S{0,2}\d{3,6}$/.test(value.trim()))){
                        callback(new Error('请输入宿舍号,例:海安A309,海滨1栋104'));
                    }else{
                        callback();
                    }
              }else{
                    callback(new Error('不能为空'));
                }
        };
        var checkSELLER_PHONE = (rule,value,callback) =>{
           if(value){
                if(!(/^1[3456789]\d{9}$/.test(value.trim()))){
                    callback(new Error('请输入正确的手机号'));
                }else{
                    callback();
                }
              }else{
                    callback(new Error('不能为空'));
                }
        };
        var checkSELLER_CLASS = (rule,value,callback) =>{
           if(value){
                if(!(/^[\u4e00-\u9fa5]{2,}\d{4}$/.test(value.trim()))){
                    callback(new Error("专业+班别,例:'信计1161'"));
                }else{
                    callback();
                }
              }else{
                    callback(new Error('不能为空'));
                }
        };
        var checkSELLER_WECHAT = (rule,value,callback) =>{
           if(value){
                    callback();
              }else{
                    callback(new Error('不能为空'));
            }
        };
        var checkPRODUCT_NAME = (rule,value,callback) =>{
           if(value){
                    callback();
              }else{
                    callback(new Error('不能为空'));
            }
        };
        var checkPRODUCT_NUM = (rule,value,callback) =>{
           if(value>=1){
                    callback();
              }else{
                    callback(new Error('不能小于1'));
            }
        };
        var checkDEADLINE = (rule,value,callback) =>{
           if(value){
                    callback();
              }else{
                    callback(new Error('不能为空'));
            }
        };
        var checkDESCRIBE = (rule,value,callback) =>{
           if(value){
                    callback();
              }else{
                    callback(new Error('不能为空'));
            }
        };
        var checkPRODUCT_PRICE = (rule,value,callback) =>{
           if(value){
                    callback();
              }else{
                    callback(new Error('不能为空'));
            }
        };
      return {
        title:'',
        productId:'',
        userName:'',
        loading:false,
        productType:[],
        uploadUrl:uploadUrl,
        fileList:[],
        userId:'',
        userSno:'',
        isfb:true,
        ruleForm: {
            PRODUCT_NAME: '',//商品名称
            PRODUCT_PRICE:'',//价格
            PRODUCT_NUM:'',//数量
            PRODUCT_CLASS:'others',//商品类别
            SELLER_NAME:'',//卖家姓名
            SELLER_DORM:'',//宿舍
            SELLER_PHONE:'',//联系方式
            SELLER_WECHAT:'',//微信号
            SELLER_CLASS:'',//班级
            DEADLINE:'',//截至时间
            DESCRIBE:'',//描述
            PRODUCT_PIC:[]//上传的图片
        },
        rules: {
          SELLER_NAME: [
            { validator: checkSELLER_NAME, trigger: 'blur' }
          ],
          SELLER_DORM:[{
              validator: checkSELLER_DORM, trigger: 'blur' 
          }],
          SELLER_PHONE:[{ validator: checkSELLER_PHONE, trigger: 'blur' }],
          SELLER_CLASS:[{ validator: checkSELLER_CLASS, trigger: 'blur' }],
          SELLER_WECHAT:[{validator: checkSELLER_WECHAT, trigger: 'blur'}],
          PRODUCT_NAME:[{validator: checkPRODUCT_NAME, trigger: 'blur'}],
          PRODUCT_PRICE:[{validator: checkPRODUCT_PRICE, trigger: 'blur'}],
          PRODUCT_NUM:[{validator: checkPRODUCT_NUM, trigger: 'blur'}],
          DEADLINE:[{validator: checkDEADLINE, trigger: 'blur'}],
          DESCRIBE:[{validator: checkDESCRIBE, trigger: 'blur'}]
        },
        backUrl:path,
      };
    },
    beforeRouteEnter(to,from,next){
        path = from.fullPath
        next();
    },
    async created(){
        this.loading = true;
        let typedata = await getProductType();
        this.productType = typedata.data;
        if(this.$route.query&&this.$route.query.id){
            this.isfb = false;
          this.productId = this.$route.query.id
          this.title = '修改商品发布信息';
          let {data} = await getProductInfo(this.productId);
          this.ruleForm = Object.assign(this.ruleForm,data[0]);
        }else{
            this.isfb = true;
            this.productId='';
            this.userName = lookCookie("userName");
            this.userId = lookCookie("userId");
            let {data} = await userSearch({keywords:this.userName});
            this.title = '发布新商品';
            this.ruleForm.SELLER_NAME = data[0].USER_NAME;
            this.ruleForm.SELLER_DORM = data[0].USER_DORM;
            this.ruleForm.SELLER_CLASS = data[0].USER_CLASS;
            this.ruleForm.SELLER_PHONE = data[0].USER_PHONE;
            this.ruleForm.SELLER_WECHAT = data[0].USER_WECHAT;
            this.userSno = data[0].USER_SNO;
        }
        this.loading = false;
    },
    methods: {
        handleRemove(file, fileList) {
        window.console.log(file, fileList);
      },
      handlePreview(response, file, fileList) {
          this.ruleForm.PRODUCT_PIC.push(response);
        window.console.log(response, file, fileList);
      },
      async submitForm(formName) {
          var _self = this;
          this.$refs['ruleForm'].validate(async (valid) => {
              if(valid){
              this.loading = true;
               if(formName=='update'){
                   let datas = this.ruleForm;
                   let data = await updateProduct({
                       productid:this.productId,
                        porductname:datas.PRODUCT_NAME,
                        productprice:datas.PRODUCT_PRICE,
                        productnum:datas.PRODUCT_NUM,
                        productclass:datas.PRODUCT_CLASS,
                        sellername:datas.SELLER_NAME,
                        sellerdorm:datas.SELLER_DORM,
                        sellerphone:datas.SELLER_PHONE,
                        sellerwechat:datas.SELLER_WECHAT,
                        sellerclass:datas.SELLER_CLASS,
                        deadline:datas.DEADLINE,
                        describe:datas.DESCRIBE
                   })
                   if(data.code==1){
                       this.$notify({
                        title: '修改成功',
                        message: `商品信息修改成功`,
                        type: 'success'
                        });
                   }else{
                       this.$notify({
                        title: '修改不成功',
                        message: `商品信息修改失败`,
                        type: 'warn'
                        });
                   }
               }else if(formName=='release'){
                   if(this.ruleForm.PRODUCT_PIC.length<=0){
                       this.$notify({
                        title: '上传商品图片',
                        message: `请上传商品图片,能更好的帮你将商品推荐给其他用户`,
                        type: 'warn'
                        });
                       return;
                   }else{
                       let objfrom = {
                           SELLER_ID:this.userId,
                           RELEASE_DATE:dateFormat("YYYY-mm-dd HH:MM:SS", new Date()),
                           SELLER_SNO:this.userSno
                       }
                       this.ruleForm = Object.assign(this.ruleForm,objfrom);
                       let data = await releaseProduct(this.ruleForm);
                       if(data.code==1){
                           this.$notify({
                            title: '发布成功',
                            message: `恭喜你,你的商品已发布成功,可在我发布的商品中查看`,
                            type: 'success'
                            });
                            _self.goBack();
                       }else{
                           this.$notify({
                            title: '发布失败',
                            message: `请查看发布信息是否填写完整`,
                            type: 'warn'
                            });
                       }
                   }
               }
               this.loading = false;
               }
          })
          
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      goBack(){
          this.$router.push(this.backUrl);
    },
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
::v-deep .el-textarea__inner{
    height: 110px;
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