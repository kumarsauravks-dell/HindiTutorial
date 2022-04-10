const express=require('express');
const path=require('path');
const ErrorHandler = require('./errors/ErrorHandler');
const app=express();
const mainRouter=require('./routes/index');
const productsRouter=require('./routes/products');

app.use(express.static('public'));

app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(mainRouter);
app.use(productsRouter);

app.use((req,res,next)=>{
    return res.json({message:"page not found"})
})

app.use((err,req,res,next)=>{
    //console.log('Error: ',err.message);
    //next();
    //res.status(422).json({message: err.message})
    if(err instanceof ErrorHandler){
        res.status(err.status).json({
            error:{
                message: err.message,
                status:err.status
            }
        })
    }else{
        res.status(500).json({
            error:{
                message:err.message,
                status:err.status
            }
        })
    }
})

const PORT=process.env.PORT || 3000
app.listen(PORT,()=>console.log(`Listening to port ${PORT}`));
