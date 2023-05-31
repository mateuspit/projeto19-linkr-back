import joi from 'joi';

export const signupSchema = joi.object({
    email: joi.string().email().required(),
    username: joi.string().required(),
    password: joi.string().min(3).required(),
    confirmPassword: joi.valid(joi.ref('password')).required().messages({
        'any.only': "\"confirmPassword\" must match \"password\""
    }),
    pictureUrl: joi.string().uri()
});

export const signinSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(3).required()
})