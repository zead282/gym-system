
import mongoose from "mongoose";

const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
    },
    plan:{
        type:String,
        required:true
    },
    member_id:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        
    }

},{timestamps:true})


export const UserModel=mongoose.models.User || mongoose.model('User',userschema)