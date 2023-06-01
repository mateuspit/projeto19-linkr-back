import { Router } from "express";
import validateToken from "../middlewares/validateTokenMiddlewares.js";
import { validateDescription, validateLink } from "../middlewares/post.middleware.js";
import tokenSchema from "../schemas/tokenSchema.js";
import { linkSchema, descriptionSchema } from "../schemas/post.schemas.js";
import { getPostController } from "../controllers/posts.controllers.js";


const postsRouter = Router();

postsRouter.post("/post",
    validateToken(tokenSchema),
    validateLink(linkSchema),
    validateDescription(descriptionSchema),
    getPostController);

export default postsRouter;