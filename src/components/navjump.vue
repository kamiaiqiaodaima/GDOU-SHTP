<template>
      <div class="footer_cs">
      <ul>
          <div v-for="(item,index) in menus" :key="item.name" >
      <li v-if="item.active" @click="changeactive(index)" >
      <span class="footer_a"><img :src="item.img1"></span>
      <span class="footer_a footer_aa" style="color:#00b0ec">{{item.name}}</span>
      </li>
      <li v-else ref="noactive" @click="changeactive(index)">
      <span class="footer_a"><img :src="item.img2"></span>
      <span class="footer_a footer_aa">{{item.name}}</span>
      </li>
      </div>
      </ul>
      </div>
</template>
<script>
export default {
      data(){
        return {
            menus:[
                {
                    name:'首页',
                    id:0,
                    path:'/',
                    img1:require('../assets/sy01.png'),
                    img2:require('../assets/syh01.png'),
                    active:this.$route.path=='/'||this.$route.path=='/shouye'?true:false
                },
                 {
                    name:'快速分类',
                     id:1,
                    path:'/fenlei',
                    img1:require('../assets/fll02.png'),
                    img2:require('../assets/flh02.png'),
                    active:this.$route.path=='/fenlei'?true:false
                },
                 {
                    name:'收藏',
                     id:2,
                    path:'/collection',
                    img1:require('../assets/csgj_cur.png'),
                    img2:require('../assets/csgj.png'),
                    active:this.$route.path=='/collection'?true:false
                },
                  {
                    name:'个人中心',
                     id:3,
                    path:'/user',
                    img1:require('../assets/renl.png'),
                    img2:require('../assets/ren.png'),
                    active:this.$route.path=='/user'?true:false
                }
            ]
        }
    },
    methods:{
        changeactive(index){
       this.menus.forEach(item => {
           item.active = false;
           if(item.id == index){
               item.active = !item.active;
               this.$router.push(item.path);
           }
       });
        }
    }
}
</script>
<style lang="scss" scoped>
//以下为脚部样式
ul,li{
    list-style: none;
}
.footer_cs{
    width: 100%;
    position: fixed;
    z-index: 100;
    height: 53px;
    left: 0px;
    bottom: 0px;
    background: rgba(255,255,255,0.95);
ul{
    width: 100%;
li{
        display: list-item;
    text-align: -webkit-match-parent;
    width: 25%;
    float: left;
    padding-top: 3px;
    .footer_a {
    width: 100%;
    display: inline-block;
    padding-top: 3px;
    text-align: center;
    font-size: 14px;
    color: #999999;
    img{
        display: initial;
            width: auto;
            height: 20px;
    }
}
.footer_aa{
        padding-top: 0px;
    padding-bottom: 3px;
}
}
   
}
}
</style>