import Joi from "joi";

export const adminSchema={body:Joi.object({
    name:Joi.string().required().min(3).max(10),
    password: Joi.string().min(8).max(40).pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
    cpass:Joi.string().valid(Joi.ref('password')).required(),
    email:Joi.string().email().required()
})
}