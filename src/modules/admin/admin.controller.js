import {adminModel} from "../../../db/models/index.models.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const addadmin=async(req,res,next)=>{

    const{name,password,email}=req.body

    ////email checking
    const isemailexist=await adminModel.findOne({email})

    if(isemailexist) return next(Error("email already exist",400))

    //hash password
    const hashpassword=bcrypt.hashSync(password,+process.env.SALT_ROUNDS)    
      
    await adminModel.create({name,password:hashpassword,email})
    
    res.status(200).json({message:"admin added"})
}

export const login=async(req,res,next)=>{

    const{email,password}=req.body

    const admin=await adminModel.findOne({email})
    if(!admin) return next(Error('invalid cradintiales',404))

    const comparepassword=bcrypt.compareSync(password,admin.password)  
    
    if(!comparepassword) return next(Error("invalid cradintiales",400));

    const token=jwt.sign({_id:admin._id,role:admin.role},process.env.JWT_LOGIN_SIGNATURE,{expiresIn:"1d"})

    res.status(200).json({message:"logged in",token})
}