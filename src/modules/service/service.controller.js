import { serviceModel } from "../../../db/models/index.models.js";
import cloudinaryConnection from "../../utils/cloudinary.connection.js";
import generateUniqueString from "../../utils/generate-unique-str.js";


export const addservice=async(req,res,next)=>{

    const{title}=req.body

    if(!req.file) return next(Error('image is required',{cause:400}))
     
     ///folder
     const folderid=generateUniqueString(4)
     //photo
     const{secure_url,public_id}=await cloudinaryConnection().uploader.upload(req.file.path,{
         folder:`${process.env.MAIN_FOLDER}/services/${folderid}`
     })
     
     const newservice=await serviceModel.create({title,image:{secure_url,public_id,folder_id:folderid}})

     res.status(200).json({mesaage:"service created",newservice})
}

export const get_all_services=async(req,res,next)=>{

    const services=await serviceModel.find()
    res.status(200).json({services})
}


export const delete_service=async(req,res,next)=>{

    const{serviceid}=req.params

    const serviceisexist=await serviceModel.findById(serviceid)

    if(!serviceisexist) return next(Error("service not found",{cause:404}))

    const folderPath=`${process.env.MAIN_FOLDER}/services/${serviceisexist.image.folder_id}`    
    await cloudinaryConnection().api.delete_resources_by_prefix(folderPath);
    await cloudinaryConnection().api.delete_folder(folderPath)

    const deleteservice=await serviceModel.findByIdAndDelete(serviceid)
    
    res.status(200).json({message:"service deleted"})
}


export const update_service=async(req,res,next)=>{

    const{serviceid}=req.params
    const{title}=req.body

    const serviceIsExist=await serviceModel.findById(serviceid)

    if(!serviceIsExist) return next(Error("service not found",{cause:400}))

    const oldpublic_id=serviceIsExist.image.public_id
    
    if(title) serviceIsExist.title=title;
    if(oldpublic_id){
        if(!req.file) return next(Error('image is required',{cause:400}))
         
         const folderPath=`${process.env.MAIN_FOLDER}/services/${serviceIsExist.image.folder_id}`
         const newpublic_id=oldpublic_id.split(`${serviceIsExist.image.folder_id}/`)[1]

         const{secure_url}=await cloudinaryConnection().uploader.upload(req.file.path,{
            folder:folderPath,
            public_id:newpublic_id

         })

         serviceIsExist.image.secure_url=secure_url
    }    

    await serviceIsExist.save();
    res.status(200).json({message:"service updated",data:serviceIsExist})
}