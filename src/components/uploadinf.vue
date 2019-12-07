<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="http://47.98.245.185:7803/savephoto"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <navjump/>
  </div>
</template>

<script>
const navjump = ()=>import('../components/navjump.vue');
export default {
  data(){
    return{
      fileList:[]
    }
  },
  components:{
    navjump
  },
  methods:{
     submitUpload() {
         this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        window.console.log(file, fileList);
      },
      handlePreview(file) {
        window.console.log(file);
      }
    }
}
</script>

<style scoped>
</style>