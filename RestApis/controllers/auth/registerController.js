import Joi, { exist } from "joi";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import { User } from "../../models";

const registerController={
    async register(req,res,next){
        //validation
        const registerSchema=Joi.object({
            name:Joi.string().min(3).max(30).required(),
            email:Joi.string().required().email(),
            password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password:Joi.ref('password')
        });
        const {error}=registerSchema.validate(req.body);
        console.log(error);
        console.log(req.body);
        if(error){
            return next(error);
        }

        //check if user already in the database
        try{
            const exsist=await User.exists({email:req.body.email});
            if(exist){
                return next(CustomErrorHandler.alreadyExist("Email Already Taken"))
            }
        }
        catch(err){
            return next(err);
        }
        res.json({msg:"Hello from register"})

    }
}

export default registerController;