
import Joi from "joi";

export const planSchema={body:Joi.object({
    name:Joi.string().required().min(3).max(10),
    price:Joi.number().required(),
    description:Joi.array().required(),
})
}