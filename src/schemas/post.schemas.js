import Joi from "joi";
///'00000000-0000-0000-0000-000000000000'
export const linkSchema = Joi.object({
    link: Joi.string().uri().required()
});

export const descriptionSchema = Joi.object({
    description: Joi.string().max(255)
});