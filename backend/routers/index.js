const express = require('express');
const router = express.Router();
router.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Content-Type,Content-Length,Authorization,Accept,x-requested-with");
    res.header("Access-Control-Allow-Methods","PUT,PATCH,POST,GET,DELETE,OPTIONS");
    if(req.method=="OPTIONS"){
        res.sendStatus(200);
    }else{
        next();
    }
})
//引入路由
const users = require('./users');
const slideshow = require('./slideshow');
const products = require('./products');
const admin = require('./admin');

router.use(express.urlencoded({
    extended:true
}),express.json())

router.use('/users',users);
router.use('/slideshow',slideshow);
router.use('/products',products);
router.use('/admin',admin);

module.exports = router;