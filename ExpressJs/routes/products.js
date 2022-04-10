const router=require('express').Router();
const ErrorHandler = require('../errors/ErrorHandler');
let products=require('../productData');

router.get('/products',(req,res)=>{
    res.render('products');
})

router.get('/api/products',(req,res)=>{
    res.json(products);
})

router.post('/api/products',(req,res,next)=>{
    const{name,price}=req.body;
    if(!name || !price){
        //return res.status(422).json({error: 'All fields are required'})
        //throw new Error("All fields are required");
        next(ErrorHandler.validatationError('Name and Price fields are required.'));
    }
    // try{
    //     console.log(city);
    // }
    // catch(err){
    //     next(ErrorHandler.serverError(err.message));
    // }
    const product={
        name:name,
        price:price,
        id:new Date().getTime().toString()
    }
    products.push(product)
    // console.log(req.body)
    res.json(product);
})

router.delete('/api/products/:productId',(req,res)=>{
    products= products.filter((product)=>req.params.productId!==product.id);
    res.json({status:"Ok"});
})

module.exports=router;