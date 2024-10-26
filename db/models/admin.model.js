import mongoose, { Schema } from "mongoose";

const adminschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'admin'
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
},{timestamps:true})


export const adminModel= mongoose.models.Admin || mongoose.model('Admin',adminschema)