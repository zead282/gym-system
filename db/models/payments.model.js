import mongoose from "mongoose";
import { paymentStatus } from "../../src/utils/enums.js";
const paymentschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true},
 
        
    transaction_id:{
        type:String,
        required:true}, 
        
    price:{
        type:Number,
        required:true},    

    payment_status:{
        type:String,
        enums:Object.values(paymentStatus),
        default:paymentStatus.pending
    },
    plan:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }   

},{timestamps:true})


export const PaymentModel=mongoose.models.Payment || mongoose.model('Payment',paymentschema)