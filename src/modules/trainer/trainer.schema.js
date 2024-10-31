
import Joi from "joi";
import { generalRules } from "../../utils/general-rules.js";

export const TrainerSchema={
    
    addTrainer:{
        headers:generalRules.headers,
        body:Joi.object({
                name:Joi.string().required().min(3).max(10),
                phoneNumber:Joi.string().min(11).max(11).required(),
                specialization:Joi.string().required(),
             
            })
    },

    update:{
       headers:generalRules.headers,

       params:Joi.object({
          trainerid:generalRules.objectId
       }),

       body:Joi.object({
        name:Joi.string().min(3).max(10),
        phoneNumber:Joi.string().min(11).max(11),
        specialization:Joi.string(),
        oldpublic_id:generalRules.objectId
     
    })
        
    },

    delete:{
        headers:generalRules.headers,
        params:Joi.object({
            trainerid:generalRules.objectId
        })
    }
    

}