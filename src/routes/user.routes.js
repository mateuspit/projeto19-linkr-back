import { Router } from 'express';
import { schemaValidation } from '../middlewares/schemaValidation.middleware.js';
import { signupSchema, signinSchema } from '../schemas/user.schemas.js';
import signupConflictValidation from '../middlewares/signup.middleware.js';
import signinValidation from '../middlewares/signin.middleware.js';
import { signup, signin, getSearchUserController } from '../controllers/user.controllers.js';
import validateToken from '../middlewares/validateTokenMiddlewares.js';
import tokenSchema from '../schemas/tokenSchema.js';

const userRouter = Router();

userRouter.post('/signup', schemaValidation(signupSchema), signupConflictValidation, signup);
userRouter.post('/signin', schemaValidation(signinSchema), signinValidation, signin);
userRouter.post("/search", validateToken(tokenSchema), getSearchUserController);
//fazer validação da entrada do user


export default userRouter;