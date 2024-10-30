import mongoose from "mongoose";

const {model , Schema}=mongoose


const planSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:[String],
        required:true
    }
},{timestamps:true})

export const Plans = mongoose.models.Plans || model('Plans',planSchema) 


