import mongoose from "mongoose";


const {model , Schema}=mongoose

const contactUsSchema=new Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      isContacted: {
        type: Boolean,
        default: false, 
      },
},{timestamps:true})

export const ContactUs = mongoose.models.ContactUs || model('ContactUs',contactUsSchema)