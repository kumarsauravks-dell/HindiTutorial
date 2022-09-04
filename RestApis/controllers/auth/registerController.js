import Joi from 'joi'
import { User } from '../../models';
import CustomErrorHandler from '../../services/customErrorHandler';
import bcrypt from 'bcrypt'
import JwtService from '../../services/JwtService';
const registerController={
    async register(req,res,next){
        const registerSchema=Joi.object({
            name:Joi.string().min(3).max(20).required(),
            email:Joi.string().required().email(),
            password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password:Joi.ref('password')
        });
        const {error}=registerSchema.validate(req.body);
        if(error){
            return next(error)
        }
        //check if user already exist
        try{
            const exist= await User.exists({email:req.body.email});
            if(exist){
                return next(CustomErrorHandler.alreadyExist('This email is already taken.'))
            }
        }
        catch(err){
            return next(err)
        }
        //hash password
        const hashedPassword=await bcrypt.hash(req.body.password,10);
        // prepare model
        const {name,email}=req.body;
        const user=new User({
            name,email,password:hashedPassword
        });
        let access_token;
        try{
            const result=await user.save();
            //token
            access_token=JwtService.sign({_id:result._id,role:result.role});

        }
        catch(err){
            return next(err);
        }
        res.json({access_token})
    }
}
export default registerController