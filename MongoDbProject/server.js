//import express  from  'express';
const express=require('express')
const app=express();

//Db Setup
const MongoClient = require('mongodb').MongoClient
let db;
MongoClient.connect('mongodb://ecomUser:secret@localhost:27017/ecom', (err, client) => {
  if (err) throw err
   db = client.db('ecom')  
})

app.get('/',(req,res)=>{
    // res.send('<h1>Hello from Express App</h1>');
    db.collection('products').find().toArray((err, result) => {
        if (err) throw err    
        res.send(result);
    })
});

app.listen(4000,()=>console.log('Listening on port 4000'));


