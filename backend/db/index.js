const{MongoClient} = require('mongodb');
const {mongourl,mongoname} = require('../config.json');
const ObjectId = require('mongodb').ObjectID;
//mongodb连接函数
async function connect(){
    let result;
    try{
         let client = await MongoClient.connect(mongourl,{
             useNewUrlParser:true,
             useUnifiedTopology:true
         });//连接mongo
         let db = client.db(mongoname);//根据mongoname连接对应的数据库
         result = {
             client,
             db
         }
    }catch(err){
         result =err;
    }
    return result;
}

/**
 * 增
 * colName string 执行操作的集合
 * data array[obj,...],添加的数据，可多个
 */
async function create(colName,data){
    let{db,client} = await connect();//开启连接
    let col = db.collection(colName);
    let result = await col.insertMany(data);
    client.close();
    return result;
}

/**
 * 删
 * colName string 执行操作的集合
 * query array[obj,...],对象里写要删的数据所有的特征参数，可多个,根据_id删除每次只能删一个仅需传{_id:id}
 */
async function remove(colName,query){
    let{db,client} = await connect();
    let col = db.collection(colName);
    let result;
    if(query._id){//根据mongo自动生成的_id作为条件
       result = await col.deleteMany({$or:[{_id:ObjectId(query._id)}]})
    }else{
        result = await col.deleteMany({$or:query});
    }

}
/**
 * 改
 */
async function update(colName,query,data){
    let{
        db,
        client
    } = await connect();
    let col = db.collection(colName);
    let result;
    if(query._id){//根据_id作为条件
        result = await col.updateMany({_id:ObjectId(query._id)},{$set:data})
    }else{
        result = await col.updateMany(query,{$set:data});
    }
    client.close();
    return result;
}
/**
 * 查
 * colName 查找的结合名字
 * query 查找的条件
 * page 页码
 * sk 一页的数量
 */
async function find(colName,query={},page,sk){
    let{db,client} = await connect();
    let result;
    let col = db.collection(colName);
    if(page){
        page = page - 1;
        if(Array.isArray(query)){result = await col.find({$or:query}).skip(sk*page-0).limit(sk-0).toArray()}
        else{result = await col.find(query).skip(sk*page-0).limit(sk-0).toArray();}
    }else{
        if(Array.isArray(query)){result = await col.find({$or:query}).toArray()}
        else{result = await col.find(query).toArray();}
        }
        client.close();
        return result;
    }
module.exports = {
    create,
    remove,
    update,
    find
}