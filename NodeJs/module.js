const Emitter=require('events');
const emitter = new Emitter();

class Auth extends Emitter{
    register(username){
        console.log(`User : ${username} successfully registered.`);
        this.emit('register',username);
    }
}

const auth=new Auth();
auth.on('register',(username)=>{
    console.log(`Registration Mail sent to User : ${username}`);
});
auth.on('register',(username)=>{
    console.log(`Sending Welcome Mail to User : ${username}`);
});

auth.register('Kumar');
