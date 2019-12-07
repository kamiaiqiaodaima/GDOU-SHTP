<template>
  <div>
    <div class="header">
      <div class="header-1">
        <el-col :span="3" style="line-height:36px;border-right:1px solid #ccc;text-align:center">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link" style="font-size:0.25rem;">
              全部分类
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
              <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <input type="text" style="width:81.5%;height:.55rem;border:1px solid #fff;padding:5px;" />
        <el-button class="button" type="warning" icon="el-icon-search"></el-button>
      </div>
      <div class="header-2">
        <ul style="display:flex" class="ul">
          <li class="li-1">11111111</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>
        <ul class="ul-1">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
    <div class="content">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in list" :key="item">
          <img :src="require(`./imgs/${item}`)" style="width:100%" />
        </el-carousel-item>
      </el-carousel>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: ["a.png", "a.png", "a.png", "a.png"]
    };
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul,
li {
  list-style: none;
}
.header {
  height: 1.633333rem;
  padding-top: 0.266667rem;
  background-color: black;
  position: relative;
}
.header-1 {
  width: 80%;
  height: 0.67rem;
  margin: auto;
  background-color: #fff;
  border-radius: 5px;
}
.header-2 {
  width: 80%;
  color: #fff;
  z-index: 88;
  position: absolute;
  top: 70%;
  left: 10%;
}
.content {
  width: 80%;
  margin: auto;
}
.button {
  width: 1.133333rem;
  height: 0.68rem;
  background: rgba(254, 189, 105, 1);
  border-radius: 0px 5px 5px 0px;
}
.ul li {
  margin-right: 10%;
}
.li-1:hover {
  background: #fff;
  color: #000;
}
.li-1:hover .ul-1 {
  display: block;
  background: #ccc;
}

.ul-1 {
  width: 5.146667rem;
  height: 7rem;
  background: #ccc;
  /* display: none; */
}
</style>