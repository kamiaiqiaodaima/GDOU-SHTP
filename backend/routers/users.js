const express = require('express');
const router = express.Router();
const mongo = require('../db');
let colName = 'users';
const ObjectId = require('mongodb').ObjectID;
let {formatData} = require('../utils');
//检测用户名是否存在
router.get('/checkUsername',async (req,res)=>{
    let {username} = req.query;
    let result = await mongo.find(colName,{USER_NAME:username});
    if(result.length>0){//有搜到数据的话，代表存在该用户了
        res.send(formatData({data:1}));
    }else{
        res.send(formatData({data:0}));
    }
})
//检测学号是否存在
router.get('/checkUsersno',async (req,res)=>{
    let {usersno} = req.query;
    let result = await mongo.find(colName,{USER_SNO:usersno});
    if(result.length>0){//有搜到数据的话，代表存在该用户了
        res.send(formatData({data:1}));
    }else{
        res.send(formatData({data:0}));
    }
})
//检测手机号是否存在
router.get('/checkUserphone',async (req,res)=>{
    let {userphone} = req.query;
    let result = await mongo.find(colName,{USER_PHONE:userphone});
    if(result.length>0){//有搜到数据的话，代表存在该用户了
        res.send(formatData({data:1}));
    }else{
        res.send(formatData({data:0}));
    }
})
//检测微信号是否存在
router.get('/checkUserwechat',async (req,res)=>{
    let {userwechat} = req.query;
    let result = await mongo.find(colName,{USER_WECHAT:userwechat});
    if(result.length>0){//有搜到数据的话，代表存在该用户了
        res.send(formatData({data:1}));
    }else{
        res.send(formatData({data:0}));
    }
})
//用户注册
router.post('/register',async (req,res)=>{
    let {
        username,
        usersno,
        userpsw,
        userdorm,
        userphone,
        userwechat,
        userclass
    } = req.body;
    if(username&&usersno&&userpsw&&userdorm&&userphone&&userclass){
        try{
           let result = await mongo.create(colName,[{
             USER_NAME : username,
             USER_SNO : usersno,
             USER_PSW : userpsw,
             USER_DORM :userdorm,
             USER_CLASS : userclass,
             USER_PHONE : userphone,
             USER_WECHAT : userwechat,
             USER_COLLECT : []
             }]);
           res.send(formatData({data:result}));
        }catch(err){
           res.send(formatData({code:0,data:err}))
        }
    }else{
        res.send(formatData({code:0,data:"必要信息不能为空"}))
    }
})
//用户登录
router.post('/login',async (req,res)=>{
    let {
        username,
        userpsw
    } = req.body;
    let result = await mongo.find(colName,{USER_NAME:username,USER_PSW:userpsw});
    if(result.length>0){//有搜到数据的话，代表存在该用户了
        res.send(formatData({data:result}));
    }else{
        res.send(formatData());
    }
})
//修改用户信息
router.post('/update',async (req,res)=>{
    let {
        id,
        username,
        usersno,
        userpsw,
        userdorm,
        userphone,
        userwechat,
        userclass,
        usercollect
    } = req.body;
    let obj = {
        USER_NAME:username,
        USER_SNO:usersno,
        USER_PSW:userpsw,
        USER_DORM:userdorm,
        USER_PHONE:userphone,
        USER_WECHAT:userwechat,
        USER_CLASS:userclass,
        USER_COLLECT:usercollect
    }
    let data = {}
    for(var key in obj){
        if(obj[key]){
          data[key] = obj[key]
        }
    }
    try{
        let result = await mongo.update(colName,{_id:id},data);
        res.send(formatData({data:result}));
    }catch(err){
        res.send(formatData({data:err}));
    }
})
//根据关键信息查找用户
//根据用户名、学号、班级、宿色地址、手机号、微信号查找相关用户
router.post('/search',async (req,res)=>{
    let {
      keywords,
      pagesize,
      pagenum
    } = req.body;
    let searchUserList;
    if(keywords){
        searchUserList = await mongo.find(colName,[
            {USER_NAME:{$regex:keywords}},
            {USER_SNO:{$regex:keywords}},
            {USER_CLASS:{$regex:keywords}},
            {USER_DORM:{$regex:keywords}},
            {USER_PHONE:{$regex:keywords}},
            {USER_WECHAT:{$regex:keywords}}
        ])
    }else{
        if(pagenum&&pagesize){
            searchUserList = await mongo.find(colName,{},pagenum,pagesize);
        }else{
            searchUserList = await mongo.find(colName);
            res.send(formatData({data:searchUserList.length}));
            return;
        }
    }
    if(searchUserList.length>0){
        res.send(formatData({data:searchUserList}));
    }else{
        res.send(formatData({data:[]}));
    }
})
//根据_id删除用户
router.post('/del',async (req,res)=>{
    let {
        id
    } = req.body;
    try{
       await mongo.remove(colName,{_id:id})
       res.send(formatData({data:"用户删除成功"}))
    }catch (err){
       res.send(formatData({code:0,data:err}))
    }
})
//根据用户_id返回用户收藏的商品
router.post('/collect',async (req,res)=>{
    let {
        id
    } = req.body;
    try{
        let users = await mongo.find(colName,{_id:ObjectId(id)});
        let collectIdList = users[0].USER_COLLECT;
        if(collectIdList.length>0){
            let collectList=[];
            let reqId = [];
            await collectIdList.forEach(async function(item){
                reqId.push({_id:ObjectId(item)})
            })
            let data = await mongo.find('products',reqId);
            collectList = collectList.concat(data);
            res.send(formatData({code:1,data:collectList}))
        }else{
            res.send(formatData({code:1,data:[]}))
        }
    }catch (err) {
        res.send(formatData({code:0,data:err}))
    }
})



module.exports = router;
