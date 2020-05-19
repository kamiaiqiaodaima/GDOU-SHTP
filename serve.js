const express = require('express');
const fs = require('fs');
const compression = require('compression');
const app = express();
app.use(compression());
app.use(express.static('./'));
app.use((req,res)=>{
    let content = fs.readFileSync('./index.html');
    res.set('content-Type','text/html;charset=utf-8');
    res.send(content)
});
app.listen(10566,()=>{
    console.log(10566+'serve is running');
})