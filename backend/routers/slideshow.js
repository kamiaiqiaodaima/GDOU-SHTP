const express = require('express');
const router = express.Router();
const mongo = require('../db');
let colName = 'slideshow';
const ObjectId = require('mongodb').ObjectID;
let {formatData} = require('../utils');
//根据productid获取所有轮播图
router.get('/all',async (req,res)=>{
    let slideshowId = await mongo.find(colName);
    let slideshowIdArr = slideshowId.map(function(item){
        return {
            _id:ObjectId(item.PRODUCTSID.trim()) 
        }
    })
    let slideshowResult = await mongo.find("products",slideshowIdArr);
    if(slideshowResult.length){
        res.send(formatData({data:slideshowResult}));
    }else{
        res.send(formatData({code:0}));
    }
})
//根据productid删除轮播图,只能单个删除
router.delete('/del',async (req,res)=>{
    let {productid} = req.body;
    try{
        await mongo.remove(colName,[{PRODUCTSID:productid}])
        res.send(formatData());
    }catch{
        res.send(formatData({code:0}))
    }
})
//根据productid添加商品到轮播图
router.post('/add',async (req,res)=>{
    let {productid} = req.body;
    try{
       await mongo.create(colName,[{PRODUCTSID:productid}]);
       res.send(formatData());
    }catch{
       res.send(formatData({code:0}))
    }
})


module.exports = router;