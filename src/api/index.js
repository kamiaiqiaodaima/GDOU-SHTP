import axios from 'axios';
let shtp = axios.create({
    baseURL:'http://localhost:6325'
})
export async function checkname(datas){
    let {data} = await shtp.get('/user/check',{
        params:{
            username:datas.username
        }
    });
    return data;
}
export async function createuser (datas){
    let {data} = await shtp.post('/user/zhuce',{
        username:datas.username,
        password:datas.pass,
        dorm:datas.dorm,
        phone:datas.phone,
        grade:datas.grade,
        studynum:datas.studynum
    })
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
export default {
    shtp,
    checkname,
    createuser,
    getLunboList,
    getLazyProductList,
    getProductNum,
    getProductType
}