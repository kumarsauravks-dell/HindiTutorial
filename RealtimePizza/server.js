require('dotenv').config();
const express=require('express');
const app=express();

const expressLayout=require('express-ejs-layouts');
const ejs=require('ejs')
const path=require('path');

const session=require('express-session');
const flash=require('express-flash');
const MongoDbStore=require('connect-mongo')

const mongoose=require('mongoose');
//Db Connection
 const url='mongodb://localhost/pizza';
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});
const connection=mongoose.connection;
connection.on('error',console.error.bind(console,'connection error'));
connection.once('open',()=>{
    console.log('DB Connected...!');
});
//session Store
let mongoStore=new MongoDbStore({
    mongoUrl:url,
    mongooseConnection:connection,
    collection:'sessions'
})
// Session Config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave:false,
    store:mongoStore,
    saveUninitialized:false,
    cookie:{maxAge:1000*60*60*24} //24 hours
}))

app.use(flash());
app.use(express.json());

//Global middleware
app.use((req,res,next)=>{
    res.locals.session=req.session
    next();
})
//set template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs');

require('./routes/web')(app);

//Assets
app.use(express.static('public'));

const PORT=process.env.PORT || 3000
app.listen(PORT,()=>console.log(`Listening to Port ${PORT}`))