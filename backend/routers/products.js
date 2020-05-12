const express = require('express');
const router = express.Router();
const mongo = require('../db');
let colName = 'products';
const ObjectId = require('mongodb').ObjectID;
const multer = require('multer');
const fs = require('fs');
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
      keywords,
      pagesize,
      pagenum
    } = req.body;
    let searchProductsList;
    if(keywords){
        searchProductsList = await mongo.find(colName,[
            {PRODUCT_NAME:{$regex:keywords}},
            {SELLER_NAME:{$regex:keywords}},
            {SELLER_CLASS:{$regex:keywords}},
            {SELLER_DORM:{$regex:keywords}},
            {DESCRIBE:{$regex:keywords}}
        ])
    }else{
        if(pagesize&&pagenum){
            searchProductsList = await mongo.find(colName,{},pagenum,pagesize);
        }else{
            searchProductsList = await mongo.find(colName);
            res.send(formatData({data:searchProductsList.length}));
            return;
        }
    }
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
    let typeProductsList;
    if(type){
        typeProductsList = await mongo.find(colName,{PRODUCT_CLASS:type},pagenum,pagesize);
    }else{
        typeProductsList = await mongo.find(colName,{},pagenum,pagesize);
    }
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
//根据商品ID获取商品信息
router.post('/info',async (req,res)=>{
    let {
        productid
    } = req.body;
    try{
        let data = await mongo.find(colName,{_id:ObjectId(productid)});
        res.send(formatData({data:data}))
    }catch(err){
        res.send(formatData({code:0,data:err}))
    }
})
//上传图片
router.post('/upload', multer({
    //设置文件存储路径
    dest: 'static'   //upload文件如果不存在则会自己创建一个。
// eslint-disable-next-line no-unused-vars
}).single('file'), function (req, res, next) {
    if (req.file.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
        res.render("error", { message: "上传文件不能为空！" });
        return
    } else {
        let file = req.file;
        let fileInfo = {};
        fs.renameSync('./static/' + file.filename, './static/' + file.originalname);//这里修改文件名字，比较随意。
        // 获取文件信息
        fileInfo.mimetype = file.mimetype;
        fileInfo.originalname = file.originalname;
        fileInfo.size = file.size;
        fileInfo.path = file.path;
        // 设置响应类型及编码
        res.set({
            'content-type': 'application/json; charset=utf-8'
        });
        res.send('http://192.168.43.193:6325/static/' + fileInfo.originalname);
    }
})
//发布商品
router.post('/release',async (req,res)=>{
    let {
        PRODUCT_NAME,
        PRODUCT_PRICE,
        PRODUCT_NUM,
        PRODUCT_PIC,
        PRODUCT_CLASS,
        SELLER_NAME,
        SELLER_DORM,
        SELLER_ID,
        SELLER_PHONE,
        SELLER_WECHAT,
        SELLER_CLASS,
        SELLER_SNO,
        RELEASE_DATE,
        DEADLINE,
        DESCRIBE,
    } = req.body;
    if(PRODUCT_NAME&&PRODUCT_PRICE&&PRODUCT_NUM&&PRODUCT_PIC&&PRODUCT_CLASS&&SELLER_NAME){
        try{
           let result = await mongo.create(colName,[{
            PRODUCT_NAME : PRODUCT_NAME,
            PRODUCT_PRICE : PRODUCT_PRICE,
            PRODUCT_NUM : PRODUCT_NUM,
            PRODUCT_PIC :PRODUCT_PIC,
            PRODUCT_CLASS : PRODUCT_CLASS,
            SELLER_NAME : SELLER_NAME,
            SELLER_DORM : SELLER_DORM,
            SELLER_ID : SELLER_ID,
            SELLER_PHONE:SELLER_PHONE,
            SELLER_WECHAT:SELLER_WECHAT,
            SELLER_CLASS:SELLER_CLASS,
            SELLER_SNO:SELLER_SNO,
            RELEASE_DATE:RELEASE_DATE,
            DEADLINE:DEADLINE,
            DESCRIBE:DESCRIBE,
             }]);
           res.send(formatData({data:result}));
        }catch(err){
           res.send(formatData({code:0,data:err}))
        }
    }else{
        res.send(formatData({code:0,data:"必要信息不能为空"}))
    }
})

module.exports = router;