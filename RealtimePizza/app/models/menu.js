const mongoose=require('mongoose');
const Schema=mongoose.Schema
//Schema S is capital means it is not a normal function , it is either class or constructor function
//To invoke a class/constructor function we have to use new keyword
const menuSchema=new Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    size:{type:String,required:true}
})

module.exports=mongoose.model('Menu',menuSchema)
//model name(Menu) must be singular and start with a capital letter. By seeing this Menu mongodb will create a collection name menus(plural)