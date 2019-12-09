const express = require('express');
const router = express.Router();
const mongo = require('../db');
let colName = 'user';
let {formatData} = require('../utils');
//检测用户名是否存在
router.get('/check',async (req,res)=>{
    let {username} = req.query;
    let result = await mongo.find(colName,{username});
    if(result.length){
        res.send(formatData({code:0}));
    }else{
        res.send(formatData());
    }
})
//用户注册
router.post('/zhuce',async (req,res)=>{
    let {username,password,dorm,phone,grade,studynum} = req.body;
    console.log({username,password,dorm,phone,grade,studynum} )
   try{
      let result = await mongo.create(colName,[{username,password,dorm,phone,grade,studynum}]);
      res.send(formatData());
   }catch(err){
      res.send(formatData({code:0,data:err}))
   }
})


module.exports = router;
