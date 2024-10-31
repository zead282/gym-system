import Joi from "joi";
import { generalRules } from "../../utils/general-rules.js";

export const serviceSchema={

   delete:{
     headers:generalRules.headers,
     params:Joi.object({serviceid:generalRules.objectId})
   },

   update:{
    headers:generalRules.headers,
    params:Joi.object({serviceid:generalRules.objectId})
   },

   add:{
    body:Joi.object({title:Joi.string().required()}),
    headers:generalRules.headers
   }





}