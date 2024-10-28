import mongoose from "mongoose";

const trainerschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        secure_url:{type:String,required:true},
        public_id:{type:String,required:true,unique:true},
        folder_id:{type:String,unique:true,required:true}
    },
    specialization:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    }
},
{timestamps:true})

export const trainerModel=mongoose.models.Trainer || mongoose.model('Trainer',trainerschema)