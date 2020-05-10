<template>
  <div
    id="box"
    style="color:#000;float:left;margin-left:50px;margin-top:40px;width:60%"
  >
    <el-form
      ref="form"
      :model="sizeForm"
      label-width="120px"
      size="large"
    >
      <el-form-item
        label="旅游标题"
        prop="title"
        :rules="{ required: true, message: '旅游标题不能为空'}"
      >
        <el-input
          type="title"
          v-model="sizeForm.title"
          style="margin-left:5px;"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="旅游副标题"
        prop="subtitle"
        :rules="{ required: true, message: '旅游副标题不能为空'}"
      >
        <el-input
          type="subtitle"
          v-model="sizeForm.subtitle"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="出发地点"
        prop="go"
        :rules="{ required: true, message: '出发地点不能为空'}"
      >
        <el-input
          type="go"
          v-model="sizeForm.go"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="价格"
        prop="price"
        :rules="{ required: true, message: '价格不能为空'}"
      >
        <el-input
          type="price"
          v-model.number="sizeForm.price"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="旅游性质">
        <el-checkbox-group v-model="sizeForm.tab">
          <el-checkbox-button
            label="观光"
            name="type"
          ></el-checkbox-button>
          <el-checkbox-button
            label="亲子"
            name="type"
          ></el-checkbox-button>
          <el-checkbox-button
            label="蜜月"
            name="type"
          ></el-checkbox-button>
          <el-checkbox-button
            label="世界遗产"
            name="type"
          ></el-checkbox-button>
          <el-checkbox-button
            label="毕业旅行"
            name="type"
          ></el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-upload
        style="margin:10px"
        class="upload-demo"
        drag
        action=" http://47.98.245.185:4399/tour"
        :on-success="uploadsuccess"
        list-type="picture"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div
          class="el-upload__tip"
          slot="tip"
        >只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-form-item size="large">
        <el-button
          type="primary"
          @click="onSubmit"
        >立即添加</el-button>
        <el-button @click="clean">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
export default {
  mounted() {
    let lb = document.getElementsByClassName("el-form-item__label");
    for (var i = 0; i < lb.length; i++) {
      lb[i].style = "color:#000;padding:0;font-size:14px";
      //  lb[i].classList.remove('el-form-item__label');
    }
  },
  data() {
    return {
      sizeForm: {
        title: "",
        subtitle: "",
        img: "",
        go: "",
        price: "",
        tab: []
      },
      canSumit: "",
      canSumit2: ""
    };
  },
  methods: {
    async onSubmit() {
      let sizeForm = this.sizeForm;
      for (var i in sizeForm) {
        if (sizeForm[i] == "") {
          this.canSumit2 = "false";
        } else {
          this.canSumit2 = "success";
        }
      }
      if (this.canSumit === "success" && this.canSumit2 === "success") {
        //图片提交成功
        let result = await this.$instance.get("/tour/addtour", {
          params: {
            sizeForm
          }
        });
        if (result.data.code == 1) {
          alert("旅游项目添加成功");
        }
      } else {
        alert("请将信息填完整");
      }
    },
    clean() {
      for (var i in this.sizeForm) {
        this.sizeForm[i] = "";
      }
    },
    uploadsuccess(event, file, fileList) {
      this.canSumit = file.status;
      this.sizeForm.img = event;
    }
  }
};
</script>
<style lang="scss" scoped>
.el-input__inner {
  height: 50px !important;
  line-height: 50px;
}
#box {
  margin: 1.25rem;
}
</style>