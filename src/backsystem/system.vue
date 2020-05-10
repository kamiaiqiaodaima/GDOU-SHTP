<template>
    <div class="syswrap" style="width:100%">
        <header style="padding:0 !important; background:#545c64;">
            <el-row >
                <el-col :span="15"><div class="grid-content bg-purple" style="height:60px !important;background-image: url(https://baike.baidu.com/pic/%E5%87%AF%E6%92%92%E6%97%85%E6%B8%B8/3684573/0/728da9773912b31b814f36858c18367adab4e17f?fr=lemma&ct=single#aid=0&pic=242dd42a2834349b17db1bc8c9ea15ce37d3be99)">
                    <h1 style="color:#fff;font-weight:normal;height:60px;font: Microsoft YaHei,Arial;
                    line-height:60px;
                    float:left;padding-left:50px;font-size:30px;
                    padding-top:10px">海大二手交易平台管理系统</h1></div></el-col>
                    
                <el-col :span="6"><div class="grid-content bg-purple" style=" height: 80px;padding-top:0px" >
                    <el-input
                        style="text-align:center;padding-top:5px;float:right;height:60px; padding-top:20px"
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        >
                    </el-input></div></el-col>     
                <el-col :span="3"><div class="grid-content bg-purple-light" style="float:right; height: 60px;margin-top:20px;
                padding-left:10px">
                    <el-menu
                        :default-active="activeIndex2"
                        class="el-menu-demo"
                        mode="horizontal"
                        @select="handleSelect"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                        <el-submenu index="1">

                            <template slot="title">
                                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                                {{username}}</template>
                            <el-menu-item index="2-1" @click="quit">退出</el-menu-item>
                        </el-submenu>
                        </el-menu>
                    </div></el-col>
            </el-row>
        </header>
        <section class="navPart">
            <aside>
                <ul class="navOne">
                        <li class="navTwo"  v-for='item in navone' :key='item.id'>
                            <p @click="show(item)">
                                <i :class="item.icon"></i> <span>{{item.text}}</span>
                            </p>

                            <ul v-if="item.tabshow">
                            <li v-for="subItem in item.childli" :key="subItem.idx">
                                <router-link :to="'/'+subItem.path">
                                    <div>
                                        <i :class="subItem.icon"></i>
                                        <h3>{{ subItem.text }}</h3>
                                    </div>
                                </router-link>
                                </li>     
                            </ul>
                        </li>
                </ul>
            </aside>
            <main>
                <router-view/>
            </main>
        </section>
    </div>
</template>
<script>
const {lookCookie,removeCookie} = require('../utils');
export default {
    data() {
        return {
            activeIndex2: '1',
            username:'',
            navone:[
                {   id:1,
                    tabshow:false,
                    text:"用户信息",
                    icon:"el-icon-user",
                    childli:[{
                        idx:1,
                        text:"用户修改",
                        icon:"el-icon-s-custom",
                        path:"userinf"   
                        },
                        // {
                        // idx:2,
                        // text:"用户添加",
                        // icon:"el-icon-s-custom",
                        // path:"adduser"   
                        // }
                        ]
                    },
                {
                    id:2,
                    text:"商品信息",
                    tabshow:false,
                    icon:'el-icon-s-grid',
                    childli:[{
                        idx:2,
                        text:"订单修改",
                        icon:"el-icon-s-custom",
                        path:"listinf"
                    }]
                }
            ],
            
        }
    },
    methods: {
        // eslint-disable-next-line no-unused-vars
        handleSelect(key, keyPath) {
        // console.log(key, keyPath);
        },
        show(item){
            item.tabshow = !item.tabshow;
        },
        quit(){
            let res = confirm("确认退出吗")
            if(res){
                removeCookie('adminname');
                removeCookie('adminpsw');
                this.$router.replace("/console")
            }
        }
        ,
        changeView(){

        }
    },
    mounted(){
        if(lookCookie('adminname')&&lookCookie('adminpsw')){
            let adminname =lookCookie('adminname')
            // console.log(account)
            this.username = adminname;
        }else{
            this.$router.replace("/console")
        }
    }
}
</script>
<style lang="scss" scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .el-form-item__label {
        color: aliceblue !important;
        font-size: 20px;
        padding-top: 10px
    }
    .el-input__inner{
            height:50px !important;line-height:50px
    }
    html, body{
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        // background-color: rgb(91, 198, 248);
    };
    .syswrap{
        width: 100%;
        height: 100%;
        header{
            height: 80px;
        }
        .navPart{
            width: 100%;
            height: calc(100vh - 80px);
            // background-color: #546 !important;
            display: flex;

            aside{
                width: 250px;
                height: 100%;
                background-color: #303335 !important;
                font-family:"Times New Roman",Georgia,Serif;
                ul{
                    width: 100%;
                    li{
                        width: 100%;
                        // height: 40px;
                        // line-height: 40px;
                        // background-color: #ccc;
                        display: flex;
                        flex-direction: column;
                        margin-bottom:10px;
                        p{ 
                            width: 100%; 
                            height: 50px;
                            line-height: 50px;
                            color:azure;
                            font-size: 30px;
                            border: 1px solid #ccc
                            i{
                            width: 30px;
                            // height: 30px;
                            font-size: 20px;
                            }
                            span{
                            width: 100%;
                            height: 50px;;
                            color:azure;
                            font-weight: bold;
                            font-size: 30px;
                        }
                        }
                        P:hover{
                            background-color: #58bc58;
                            color: antiquewhite;
                        }
                        ul{
                            width: 100%;
                            // background-color: #58bc58;
                            color: antiquewhite;
                            li{
                                height: 40px;
                                line-height: 40px; 
                                color:white; 
                                font-size: 20px;
                                display: flex;
                                align-items: center;
                                margin-bottom:5px;
                                // router-link{
                                // display: flex;
                                // flex-direction: column;
                                a{
                                    text-decoration: none;
                                    color: aliceblue;
                                }
                                div{
                                    display: flex;
                                    align-items: center;
                                }
                                // }
                            }
                            li:hover{
                                background-color: #3a93e7;
                                color: antiquewhite;
                            }
                        }
                    }
                }
            }

            main{
                width: calc(100% - 250px);
                height: 100%;
                overflow: auto;
            }
        }
    }
</style>