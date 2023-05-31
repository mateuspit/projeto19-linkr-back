import { Router } from "express";
import validateToken from "../middlewares/validateTokenMiddlewares.js";
import validateLink from "../middlewares/validateLinkMiddlewares.js";
import tokenSchema from "../schemas/tokenSchema.js";
import linkSchema from "../schemas/linkSchema.js";
import { getPostController } from "../controllers/posts.controllers.js";


const postsRouter = Router();

postsRouter.post("/post", validateToken(tokenSchema), validateLink(linkSchema), getPostController);

export default postsRouter;