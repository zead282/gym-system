import { ContactUs } from "../../../db/models/contactUs.model.js"
import emailTemplet from "../../service/email-templet.js"
import { sendEmail } from "../../service/send-email.service.js"
import { ErrorHandleClass } from "../../utils/error-class.utils.js"





/** 
@api  {Post} /contactUs/addContact      add contact
*/
export const addContact = async (req, res, next) => {
    //get el data
    const { name, email, phone} = req.body
    //check if this email is exist 
    // const isEmailExist = await ContactUs.findOne({ email })
    // if (isEmailExist) {
    //     return next(new ErrorHandleClass('email is already exist', 400))
    // }
    //prepare  data
    const contact = {
        name,
        email,
        phone
    }
    //create user
    const newContact = await ContactUs.create(contact)
 

    //send email 
   const isEmailSent = await sendEmail(
        {
            from : "gym" ,
            to : email , 
            subject : "contact us" ,
            message : emailTemplet({
                subject: "contact us message" ,
                info: `Thank you for reaching out to us. We will contact you as soon as possible😍`
              })
        })
        if(!isEmailSent) return next(new ErrorHandleClass("failed to send email", 500))

    //send response
    res.status(201).json({ message: 'contact created', newContact })

}

/** 
@api  {get} /contactUs/getAllContact      get contact
*/
export const getAllContact = async (req, res, next) => {
    //get all users
    const allContact = await ContactUs.find()
    if(!allContact){
        return next(new ErrorHandleClass('no data found', 404))
    }
    //send response
    res.status(200).json({ message: 'all contact' , allContact })
}


/** 
@api  {put} /contactUs/updateContact      update isContacted and make it true
*/
export const updateContact = async (req, res, next) => {
    //get el data
    const { _id } = req.params
    //check if this user is exist 
    const contact = await ContactUs.findById(_id)
    if (!contact) {
        return next(new ErrorHandleClass('contact not found', 404))
    }
    //update this contact and make isContacted true
    if(!contact.isContacted){
        contact.isContacted = true
        await contact.save()
    }
    
    //send response
    res.status(200).json({ message: 'contact updated', contact })
}

/** 
@api  {delete} /contactUs/deleteContact      delete contact
*/
export const deleteContact = async (req, res, next) => {
    //get el data
    const { _id } = req.params
    //check if this contact is exist 
    const contact = await ContactUs.findById(_id)
    if (!contact) {
        return next(new ErrorHandleClass('contact not found', 404))
    }
    //delete this contact
    await contact.deleteOne()
    //send response
    res.status(200).json({ message: 'contact deleted', contact })
}


