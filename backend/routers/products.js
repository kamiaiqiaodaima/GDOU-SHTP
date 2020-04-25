const express = require('express');
const router = express.Router();
const mongo = require('../db');
let colName = 'products';
const ObjectId = require('mongodb').ObjectID;
let {formatData} = require('../utils');
//根据用户id查找该用户销售的商品
router.post('/sellgoods',async (req,res)=>{
    let {sellerid} =req.body;
    let sellgoodsResult = await mongo.find(colName,{SELLER_ID:sellerid});
    if(sellgoodsResult.length>0){
        res.send(formatData({data:sellgoodsResult}));
    }else{
        res.send(formatData({data:"没有商品发布"}));
    }
})
//根据商品名、用户名、班级、宿色地址、描述中的关键字查找商品
router.post('/search',async (req,res)=>{
    let {
      keywords
    } = req.body;
    console.log(keywords)
    let searchProductsList = await mongo.find(colName,[
        {PRODUCT_NAME:{$regex:keywords}},
        {SELLER_NAME:{$regex:keywords}},
        {SELLER_CLASS:{$regex:keywords}},
        {SELLER_DORM:{$regex:keywords}},
        {DESCRIBE:{$regex:keywords}}
    ])
    if(searchProductsList.length>0){
        res.send(formatData({data:searchProductsList}));
    }else{
        res.send(formatData({data:"没有查到相关商品"}));
    }
})
//根据类别查找商品
router.get('/type',async (req,res)=>{
    let {
        type,
        pagesize,
        pagenum
    } = req.query;
    let typeProductsList = await mongo.find(colName,{PRODUCT_CLASS:type},pagenum,pagesize);
    if(typeProductsList.length>0){
        res.send(formatData({data:typeProductsList}));
    }else{
        res.send(formatData());
    }
})
//查找商品数量
router.get('/productnum',async (req,res)=>{
    let {
        type
    } = req.query;
    var query = {};
    if(type){//传类型就查找这个类型的商品数量，不穿就查看所有商品的数量
        query.PRODUCT_CLASS = type;
    }
    try{
        let typeProductsList = await mongo.find(colName,query);
        res.send(formatData({data:typeProductsList.length}));
    }catch{
        res.send(formatData({code:0}));
    }
})
//根据商品_id修改商品信息
router.post('/update',async (req,res)=>{
    let {
        productid,
        porductname,
        productprice,
        productnum,
        productclass,
        sellername,
        sellerdorm,
        sellerphone,
        sellerwechat,
        sellerclass,
        sellersno,
        deadline,
        describe
    } = req.body;
    var obj = {
        PRODUCT_NAME:porductname,
        PRODUCT_PRICE:productprice,
        PRODUCT_NUM:productnum,
        PRODUCT_CLASS:productclass,
        SELLER_NAME:sellername,
        SELLER_DORM:sellerdorm,
        SELLER_PHONE:sellerphone,
        SELLER_WECHAT:sellerwechat,
        SELLER_CLASS:sellerclass,
        SELLER_SNO:sellersno,
        DEADLINE:deadline,
        DESCRIBE:describe
    }
    var data = {};
    for(var key in obj){
        if(obj[key]){
            data[key] = obj[key]
        }
    }
    if(data){
        try{
            await mongo.update(colName,{_id:productid},data)
            res.send(formatData());
        }catch(err){
            res.send(formatData({code:0}));
        }
    }else{
        res.send(formatData({code:0}));
    }
    
})
//根据商品_id删除商品
router.post('/del',async (req,res)=>{
    let {
        productid
    } = req.body;
    try{
        await mongo.remove(colName,{_id:productid});
        res.send(formatData({data:"删除成功"}))
    }catch(err){
        res.send(formatData({code:0,data:err}))
    }
})

module.exports = router;