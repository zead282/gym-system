
import Joi from "joi";

export const addTrainerSchema={body:Joi.object({
    name:Joi.string().required().min(3).max(10),
    phoneNumber:Joi.string().min(11).max(11).required(),
    specialization:Joi.string().required(),
 
})}