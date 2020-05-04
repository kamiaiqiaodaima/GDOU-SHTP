import Vue from 'vue';
import VueRouter from 'vue-router';
//更改vuerouter原型下面的push方法
const originpush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location){
    return originpush.call(this,location).catch(err=>err);
}
Vue.use(VueRouter);
//引入页面组件
const shouye = ()=>import('../pages/shouye.vue');
const fenlei = ()=>import('../pages/fenlei.vue');
const collection = ()=>import('../pages/collection.vue');
const user = ()=>import('../pages/user.vue');
const zhuce = ()=>import('../components/zhuce.vue');
const MUProduct = ()=>import('../components/MUProduct.vue');
const modifyPersonalInf = ()=>import('../components/modifyPersonalInf.vue');
const log = ()=>import('../components/log.vue');
let router = new VueRouter({
    mode:'hash',
    routes:[
        {
            name:'shouye',
            path:'/shouye',
            component:shouye
        },
        {
            path:'/',
            redirect:'/shouye'       
        },
        {
            name:'fenlei',
            path:'/fenlei',
            component:fenlei
        },
        {
            name:'collection',
            path:'/collection',
            component:collection
        },
        {
            name:'user',
            path:'/user',
            component:user
        },
        {
            name:'zhuce',
            path:'/user/zhuce',
            component:zhuce
        },
        {
            name:'MUProduct',
            path:'/user/MUProduct',
            component:MUProduct
        },
        {
            name:'modifyPersonalInf',
            path:'/user/modifyPersonalInf',
            component:modifyPersonalInf
        },
        {
            name:'log',
            path:'/user/log',
            component:log
        }
    ]
})
export default router;