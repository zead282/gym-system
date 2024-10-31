
import mongoose from "mongoose";

const {model , Schema}=mongoose


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone:{
        type:String,
        required:true
    },
    plan:{
        type:String,
        required:true
    },
    membershipID:{
        type:String,
        required:false
    },

},{timestamps:true})

export const Users = mongoose.models.Users || model('Users',userSchema)
