import axios from 'axios';
let shtp = axios.create({
    baseURL:'http://localhost:6325'
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
        keywords:datas.keywords
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
    usercollect
}