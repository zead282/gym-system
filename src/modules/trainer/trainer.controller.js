
import { trainerModel } from "../../../db/models/index.models.js";
import cloudinaryConnection from "../../utils/cloudinary.connection.js";
import generateUniqueString from "../../utils/generate-unique-str.js";

export const addtrainer=async(req,res,next)=>{

    const{name,phoneNumber,specialization}=req.body;

     //upload image
     if(!req.file){
        return next({message:"upload trainer logo",cause:400})
    }
    
    ///folder
    const folderid=generateUniqueString(4)
    //photo
    const{secure_url,public_id}=await cloudinaryConnection().uploader.upload(req.file.path,{
        folder:`${process.env.MAIN_FOLDER}/trainers/${folderid}`
    })

    const newtrainer={
        name,phoneNumber,specialization,image:{secure_url,public_id,folder_id:folderid}
    }
    
    const trainer=await trainerModel.create(newtrainer);

    res.status(201).json({
        message:"trainer added success",
        date:trainer
    })

}


///delete trainer
export const deletetrainer=async(req,res,next)=>{

    const{trainerid}=req.params;

    ///check on trainer
    const trainerExist=await trainerModel.findById(trainerid);
    if(!trainerExist) return next(Error("trainer not found",404))

    const folder_path=`${process.env.MAIN_FOLDER}/trainers/${trainerExist.image.folder_id}` 
    
    await cloudinaryConnection().api.delete_resources_by_prefix(folder_path);
    await cloudinaryConnection().api.delete_folder(folder_path)

    const deleteTrainer=await trainerModel.findByIdAndDelete(trainerid)
    
    res.status(200).json({message:"trainer deleted"})    
}

///get trainers

export const get_all_trainers=async(req,res,next)=>{

    const trainers=await trainerModel.find()
    res.status(200).json({trainers:trainers})
}

///update trainer

export const update_trainer=async(req,res,next)=>{
    
    const{trainerid}=req.params
    const{name,phoneNumber,specialization,oldpublic_id}=req.body;

    ///check on trianer
    const trainer=await trainerModel.findById(trainerid)
    if(!trainer) return next(Error('trainer not found',400))
     
    if(name) trainer.name=name
    if(phoneNumber) trainer.phoneNumber=phoneNumber
    if(specialization) trainer.specialization=specialization
    if(oldpublic_id){
        if(!req.file) return next(Error('image is requeried',400))
            
        const folder=trainer.image.folder_id
        const newpublic_id=oldpublic_id.split(`${folder}/`)[1]

        const{secure_url}=await cloudinaryConnection().uploader.upload(req.file.path,{
            folder:`${process.env.MAIN_FOLDER}/trainers/${folder}`,
            public_id:newpublic_id
        })

        trainer.image.secure_url=secure_url
    }
    
    await trainer.save();
    res.status(200).json({message:"trainer updated",data:trainer})
}