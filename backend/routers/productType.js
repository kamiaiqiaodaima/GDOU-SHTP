const express = require('express');
const router = express.Router();
const mongo = require('../db');
let colName = 'productType';
const ObjectId = require('mongodb').ObjectID;
let {formatData} = require('../utils');
//根据所有商品类型
router.get('/all',async (req,res)=>{
    let pdTypeList = await mongo.find(colName);
    if(pdTypeList.length>0){
        console.log(pdTypeList);
        res.send(formatData({data:pdTypeList}));
    }else{
        res.send(formatData({code:0}));
    }
})

module.exports = router;