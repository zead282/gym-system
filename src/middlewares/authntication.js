import jwt from "jsonwebtoken";
import { adminModel } from "../../db/models/admin.model.js";

export const authntication=()=>{
    return async(req,res,next)=>{

        try{
            ///destructing token from header
            const{accesstoken}=req.headers
           
            if(!accesstoken) return next(new Error('please login first', { cause: 400 }))
            
             ///check on secrete prefix   
            if(!accesstoken.startsWith(process.env.Token_Prefix)) return next(new Error("invalid prefix",{cause: 400 }))   
              
            ///split token
            const token=accesstoken.split(process.env.Token_Prefix)[1]    
              
            const decoded=jwt.verify(token,process.env.JWT_LOGIN_SIGNATURE)
            
            if(!decoded?._id) return next(Error('invalid token payload'))
            
            const admin=await adminModel.findOne({_id:decoded._id})   
            
            if(!admin) return next(Error("admin not found",400))

            req.authUser=admin
            next()    

        }
        catch(err){
            console.log(err);
            
            
            next(new Error('token expired', { cause: 500 }))
        }
        

    }
}
