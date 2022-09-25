let socket=io()
let username;
do
{
    username=prompt("Enter your name?")
}while(!username)

const textarea=document.querySelector('#comment')
const commentBtn=document.querySelector('#comment-btn');
const commentBox= document.querySelector('.comment_box');

commentBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const comment=textarea.value
    postComment(comment);
});

function postComment(comment){
    //Append to DOM
    let data={
        username: username,
        comment:comment
    }
    appendToDom(data)
    textarea.value='';
    //Broadcast
    broadcastComment(data)
    //Sync with mongodb
    syncWithDb(data)
}

function appendToDom(data){
    let liTag=document.createElement('li');
    liTag.classList.add('comment','mb-3')
    let markup=`
    <div class="card border-light mb-3">
        <div class="card-body">
            <h6 class="fw-bold">${data.username}</h6>
            <p>${data.comment}</p>
            <div>
                <img width="12" src="/img/clock.png" alt="clock">
                <small>${moment(data.time).format('LT')}</small>
            </div>
        </div>
    </div>
    `
    liTag.innerHTML=markup
    commentBox.prepend(liTag)
}

function broadcastComment(data){
    //Socket
    //Emit event
    socket.emit('comment',data)
}

socket.on('comment',data=>{
    appendToDom(data);
})

//Event listner on textarea when a user is typing
textarea.addEventListener('keyup',(e)=>{
    socket.emit('typing',{username})
})

let typingDiv=document.querySelector('.typing');
socket.on('typing',(data)=>{
    typingDiv.innerText=`${data.username} is typing....`
    debounce(function(){
        typingDiv.innerText=''
    },1000)
})

let timerId=null;
function debounce(func,timer){
    if(timerId){
        clearTimeout(timerId)
    }
    timerId=setTimeout(()=>{
        func();
    },timer)
}

//Api Calls
function syncWithDb(data){
    const headers={
        'Content-Type':'application/json'
    }
    fetch('/api/comments',{method:'Post',body:JSON.stringify(data),headers})
    .then(response=>response.json())
    .then(result=>{
        console.log(result)
    })
}   

function fetchComments(){
    fetch('/api/comments')
    .then(res=>res.json())
    .then(result=>{
        result.forEach((comment)=>{
            comment.time=comment.createdAt
            appendToDom(comment)
        })
    })
}

window.onload=fetchComments

