const express = require('express');
const router = express.Router();
const mongo = require('../db');
let colName = 'admin';
// eslint-disable-next-line no-unused-vars
const ObjectId = require('mongodb').ObjectID;
let {formatData} = require('../utils');
//管理员登录
router.post('/login',async (req,res)=>{
    let {adminname,adminpsw} = req.body;
    let result = await mongo.find(colName,{ADMIN_NAME:adminname,ADMIN_PSW:adminpsw});
    if(result.length>0){//有搜到数据的话，代表存在该用户了
        res.send(formatData({data:1}));
    }else{
        res.send(formatData({data:0}));
    }
})
module.exports = router;
