const http=require('http');
const fs=require('fs');
const path=require('path')
const app=http.createServer((req,res)=>{
    
    let filepath=path.join(__dirname,'public',req.url==='/'?'index.html':req.url)

    let contentType='text/html'
    let ext=path.extname(filepath)
    if(!ext){
        filepath+='.html'
    }
    switch(ext){
        case '.css':
            contentType='text/css'
            break;
        case '.js':
            contentType='text/javascript'
            break;
        default:
            contentType='text/html'
    }

    fs.readFile(filepath,(err,content)=>{
        if(err){
            fs.readFile(path.join(__dirname,'public','error.html'),(err,data)=>{
                if(err){
                    res.writeHead(500)
                    res.end('Error!!');
                }
                else{
                    res.writeHead(404,{
                        'Content-Type':contentType
                    })
                    res.end(data)
                }
            })
        }
        else{
            res.writeHead(200,{
                'Content-Type':contentType
            })
            res.end(content)
        }
    })
});
const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Listening to port : ${PORT}`);
});