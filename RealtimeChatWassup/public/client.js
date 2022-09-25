const socket=io();
let username;
do{
    username= prompt("Please Enter your name?")
}while(!username)

const textarea=document.querySelector('#textarea');
const messageArea=document.querySelector('.message_area');

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg={
        user:username,
        message:message.trim()
    }
    //Append
    appendMessage(msg,'outgoing')
    textarea.value=""
    scrollToBottom();
    //Send to server
    socket.emit('message',msg)
}

function appendMessage(msg,type){
    let mainDiv=document.createElement('div')
    let className=type
    mainDiv.classList.add(className,'message')

    let markup=`
    <h6 class="fw-bold mb-1">${msg.user}</h6>
    <p class="my-2">${msg.message}</p>
    `
    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv)
}

//Recieve message from server
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom();
})

function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}