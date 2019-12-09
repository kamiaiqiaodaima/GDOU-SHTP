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
    window.console.log(datas);
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
export default {
    shtp,
    checkname,
    createuser
}