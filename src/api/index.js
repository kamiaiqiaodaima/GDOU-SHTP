import axios from 'axios';
import {apiurl} from '../utils';
let shtp = axios.create({
    baseURL:apiurl
})
//查询数据库用户名是否存在
export async function checkname(datas){
    let {data} = await shtp.get('/users/checkUsername',{
        params:{
            username:datas
        }
    });
    return data;
}
//学号是否存在
export async function checksno(datas){
    let {data} = await shtp.get('/users/checkUsersno',{
        params:{
            usersno:datas
        }
    });
    return data;
}
//手机号是否存在
export async function checkuserphone(datas){
   let {data} = await shtp.get('/users/checkUserphone',{
       params:{
        userphone:datas
       }
   });
   return data;//返回为1代表用户手机号已经注册，返回0代表未注册
}
//微信号是否存在
export async function checkuserwechat (datas){
    let {data} = await shtp.get('/users/checkUserwechat',{
        params:{
            userwechat:datas
        }
    });
    return data;
}
//用户注册
export async function createuser (datas){
    let {data} = await shtp.post('/users/register',{
        username:datas.Username,
        usersno:datas.studynum,
        userpsw:datas.pass,
        userdorm:datas.dorm,
        userphone:datas.phone,
        userwechat:datas.wechat,
        userclass:datas.grade
    })
    return data;
}
//用户登录
export async function userLog (datas) {
    let {data} = await shtp.post('/users/login',{
        username:datas.username,
        userpsw:datas.password
    });
    return data;
}
//获取轮播图
export async function getLunboList (){
    let {data} = await shtp.get('/slideshow/all',{});
    if(data.code==1){
        return data.data;
    }
}
//删除轮播图
export async function delLunboList (datas) {
    let {data} = await shtp.delete('/slideshow/del',{
        params:{
            productid:datas.id
        }
    });
    return data;
}
//添加轮播图
export async function addLunboList (datas){
    let {data} = await shtp.post('/slideshow/add',{
        productid:datas.id
    });
    return data;
}
//获取懒加载商品
export async function getLazyProductList (size,num,type) {
    let {data} = await shtp.get('/products/type',{
        params:{
            pagesize:size,
            pagenum:num,
            type:type
        }
    });
    if(data.code==1){
        return data.data;
    }
}
//获取商品数量
export async function getProductNum (type){
    let {data} = await shtp.get('/products/productnum',{
        params:{
            type:type
        }
    });
    return data;
}
//获取商品类型
export async function getProductType (){
    let {data} = await shtp.get('/productType/all',{});
    return data;
}
//修改用户信息
export async function modifyUser (datas) {
    let {data} = await shtp.post('/users/update',{
        id:datas.id,
        username:datas.username,
        usersno:datas.usersno,
        userpsw:datas.userpsw,
        userdorm:datas.userdorm,
        userphone:datas.userphone,
        userwechat:datas.userwechat,
        userclass:datas.userclass,
        usercollect:datas.usercollect,
    });
    return data;
}
//查找用户
export async function userSearch (datas) {
    let {data} = await shtp.post('/users/search',{
        keywords:datas.keywords,
        pagesize:datas.pagesize,
        pagenum:datas.pagenum
    });
    return data;
}
//根据id获取用户的收藏商品信息
export async function usercollect (datas){
    let {data} = await shtp.post('/users/collect',{
        id:datas.id
    });
    return data;
}
//根据关键词查找商品
export async function searchProduct (datas){
    let {data} = await shtp.post('/products/search',{
        keywords:datas.keywords,
        pagenum:datas.pagenum,
        pagesize:datas.pagesize
    });
    return data;
}
//根据商品id获取商品详细信息
export async function getProductInfo(id){
    let {data} = await shtp.post('/products/info',{
        productid:id
    });
    return data;
}
//根据用户id查找该用户发布的商品
export async function getSellProduct(id){
    let {data} = await shtp.post('/products/sellgoods',{
        sellerid:id
    });
    return data;
}
//修改商品信息
export async function updateProduct (datas){
    let {data} = await shtp.post('/products/update',{
        productid:datas.productid,
        porductname:datas.porductname,
        productprice:datas.productprice,
        productnum:datas.productnum,
        productclass:datas.productclass,
        sellername:datas.sellername,
        sellerdorm:datas.sellerdorm,
        sellerphone:datas.sellerphone,
        sellerwechat:datas.sellerwechat,
        sellerclass:datas.sellerclass,
        sellersno:datas.sellersno,
        deadline:datas.deadline,
        describe:datas.describe
    });
    return data;
}
//商品发布
export async function releaseProduct (datas){
    let {data} = await shtp.post('/products/release',{
        PRODUCT_NAME : datas.PRODUCT_NAME,
        PRODUCT_PRICE : datas.PRODUCT_PRICE,
        PRODUCT_NUM :  datas.PRODUCT_NUM,
        PRODUCT_PIC : datas.PRODUCT_PIC,
        PRODUCT_CLASS : datas.PRODUCT_CLASS,
        SELLER_NAME :  datas.SELLER_NAME,
        SELLER_DORM :  datas.SELLER_DORM,
        SELLER_ID :  datas.SELLER_ID,
        SELLER_PHONE: datas.SELLER_PHONE,
        SELLER_WECHAT: datas.SELLER_WECHAT,
        SELLER_CLASS: datas.SELLER_CLASS,
        SELLER_SNO: datas.SELLER_SNO,
        RELEASE_DATE: datas.RELEASE_DATE,
        DEADLINE: datas.DEADLINE,
        DESCRIBE: datas.DESCRIBE,
    });
    return data;
}
//下架商品
export async function delProduct (id){
    let {data} = await shtp.post('/products/del',{
        productid:id
    });
    return data;
}
//管理员登录
export async function adminLog (datas){
    let {data} = await shtp.post('/admin/login',{
        adminname:datas.name,
        adminpsw:datas.psw
    });
    return data;
}
//删除用户
export async function delUser (datas){
    let {data} = await shtp.post('/users/del',{
        id:datas.id
    });
    return data;
}
export default {
    shtp,
    checkname,
    createuser,
    getLunboList,
    getLazyProductList,
    getProductNum,
    getProductType,
    checksno,
    checkuserphone,
    checkuserwechat,
    userLog,
    modifyUser,
    userSearch,
    usercollect,
    searchProduct,
    getProductInfo,
    getSellProduct,
    updateProduct,
    releaseProduct,
    delProduct,
    adminLog,
    delLunboList,
    addLunboList
}