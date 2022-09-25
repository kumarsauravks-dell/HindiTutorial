const express=require('express')
const app=express();
app.use(express.static('public'))

//Db Connection
const mongoose=require('mongoose');
const Comment = require('./models/comment');
const url='mongodb://localhost/comments'
mongoose.connect(url,{
    //userNewUrlParser: true,
    useUnifiedTopology:true,
    //useFindAndModify:true
})
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('Db Connected')
})

app.use(express.json())
//Routes
app.post('/api/comments',(req,res)=>{
    const comment=Comment({
        username:req.body.username,
        comment:req.body.comment
    })
    comment.save().then(response=>{
        res.send(response);
    })
})
app.get('/api/comments',(req,res)=>{
    Comment.find().then((comments)=>{
        res.send(comments)
    })
})

const PORT=process.env.PORT | 3000
const server=app.listen(PORT,()=>console.log(`Listening to port ${PORT}`))

let io=require('socket.io')(server)

io.on('connection',(socket)=>{
    //console.log(`New connection: ${socket.id}`)
    //Receive event
    socket.on('comment',(data)=>{
        //console.log(data)
        data.time=Date()
        socket.broadcast.emit('comment',data)
    })

    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data)
    })
})