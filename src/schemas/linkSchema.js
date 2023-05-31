import Joi from "joi";

///'00000000-0000-0000-0000-000000000000'

const linkSchema = Joi.object({
    link: Joi.string().uri()
});

export default linkSchema;
