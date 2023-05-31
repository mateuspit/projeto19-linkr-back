import Joi from "joi";

///'00000000-0000-0000-0000-000000000000'
////f5e16715-b3b3-43eb-a575-c612106a1085

const tokenSchema = Joi.object({
    token: Joi.string().guid({
        version: [
            'uuidv4'
        ]
    })
});

export default tokenSchema;
