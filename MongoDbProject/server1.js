const  ObjectId  = require('mongodb').ObjectId;
const express= require('express');
const app=express();
const MongoClient=require('mongodb').MongoClient
let db;
const connectionUrl='mongodb://ecomUser:secret@localhost:27017/ecom';
// Create a immediate invoke fuction
(async function(){
    try{
        const client=await MongoClient.connect(connectionUrl)
        db=client.db('ecom')
    }
    catch(err){
        throw err
    }
})();

app.get('/',async (req,res)=>{
    try{
        const result=await db.collection('products').find().toArray()
        res.send(result);
    }
    catch(err){
        throw err
    }
})
app.get('/insert',async (req,res)=>{
    try{
        const result=await db.collection('products').insertOne({
            name:'Camera',
            price:400
        })
        res.send(result);
    }
    catch(err){
        throw err
    }
})
app.get('/find',async (req,res)=>{
    try{
        const result=await db.collection('products').findOne({
            _id: ObjectId("62526f7aae52b1b8666b4409")
        })
        res.send(result);
    }
    catch(err){
        throw err
    }
})

app.listen(4000,()=>console.log('Listening on port 4000'));
