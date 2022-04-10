const register=function (username){
    console.log(`User ${username} has been registered.`)
}


const login=function(username,password){
    console.log(`User ${username} succefully logged in.`)
}
module.exports={
    register,//register:register
    login//login:login
}