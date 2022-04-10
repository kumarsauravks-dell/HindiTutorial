class ErrorHandler{
    constructor(status,msg){
        this.status=status;
        this.message=msg;
    }

    static validatationError(message='All fields are required'){
        return new ErrorHandler(422,message);
    }

    static notFoundError(message='not found'){
        return new ErrorHandler(404,message);
    }

    static serverError(message='Internal server error'){
        return new ErrorHandler(500,message);
    }

    static forbidden(message='Not allowed'){
        return new ErrorHandler(403,message);
    }
}

module.exports=ErrorHandler;