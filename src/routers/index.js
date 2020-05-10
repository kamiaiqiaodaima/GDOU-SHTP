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
const search = () =>import('../components/shouye/search.vue');
const productDetail = () =>import('../components/productDetail.vue');
const personalProduct = () =>import('../components/personalProduct.vue');
const regpage = () =>import('../backsystem/regpage.vue');
const system = () =>import('../backsystem/system.vue');
const userinf = () =>import('../backsystem/userinf.vue');
const listinf = () =>import('../backsystem/listinf.vue');
const adduser = () =>import('../backsystem/adduser.vue');

let router = new VueRouter({
    mode:'hash',
    routes:[
        {
            path:'/console',
            redirect:'/console/regpage'       
        },
        {
            name:'regpage',
            path:'/console/regpage',
            component:regpage
        },
        {
            name:'system',
            path:'/console/system',
            component:system,
                children: [{
                    name: 'userinf',
                    path: '/userinf',
                    component: userinf
                },
                {
                    name: 'listinf',
                    path: '/listinf',
                    component: listinf
                },
                {
                    name: 'adduser',
                    path: '/adduser',
                    component: adduser
                },
            ]
        },
        {
            name:'search',
            path:'/search',
            component:search
        },
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
            path:'/user/personalProduct/MUProduct',
            component:MUProduct
        },
        {
            name:'personalProduct',
            path:'/user/personalProduct',
            component:personalProduct
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
        },
        {
            name:'productDetail',
            path:'/productDetail',
            component:productDetail
        }
    ]
})
export default router;