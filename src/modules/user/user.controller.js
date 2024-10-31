import { Users } from "../../../db/models/user.model.js"
import { ErrorHandleClass } from "../../utils/error-class.utils.js"









/** 
@api  {Post} /users/createUser      create users
*/
export const createUser=async(req,res,next)=>{
    //get el data 
    const{name,email,phone,plan}=req.body
    //check if this phone is already exist
    const isEmailExist=await Users.findOne({email})
    if(isEmailExist){
        return next(new ErrorHandleClass('email is already exist',400))
    } 
 
    //create membership ID
   
    const ID =() => Date.now().toString().slice(-7)

    //prepare user data
    const user={
        name,
        email,
        phone,
        plan,
        membershipID:ID()
    }
    //create user
    const newUser=await Users.create(user)
    //send response
    res.status(201).json({message:'user created',newUser})

}





/** 
@api  {Get} /users/getallusers        get all users
*/
export const getALLUsers = async (req, res, next) => {

    //get all data from database
    const allUsers = await Users.find()
    //check if there is no data
    if (!allUsers) {
        return next(new ErrorHandleClass('no data found', 404))
    }
    //send response
    res.status(200).json({ message: 'all users' ,allUsers})
}


/** 
@api  {Put} /users/update users       update users
*/
export const updateUser = async(req ,res, next) =>{
    //get el data 
    const{_id}=req.params
    const {name ,email ,phone ,plan} =req.body
    //check if this user is exist \
    const user=await Users.findById(_id)
    if(!user){
        return next(new ErrorHandleClass('user not found',404))
    }

    //update user
    if(name)user.name=name
    if(email)user.email=email
    if(phone)user.phone=phone
    if(plan)user.plan=plan
    //save el update
    await user.save()
    //send response
    res.status(200).json({ message: 'user updated' ,user})
    
}



/** 
@api  {delete} /users/delete users       delete users
*/
export const deleteUser = async(req ,res, next) =>{
    //get el data
    const{_id}=req.params
    //check if this user is exist 
    const user=await Users.findById(_id)
    if(!user){
        return next(new ErrorHandleClass('user not found',404))
    }
    //delete user
    await user.deleteOne()
    //send response
    res.status(200).json({ message: 'user deleted' ,user})
}