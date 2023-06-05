import { Router } from "express";
import validateToken from "../middlewares/validateTokenMiddlewares.js";
import { validateDescription, validateLink } from "../middlewares/post.middleware.js";
import tokenSchema from "../schemas/tokenSchema.js";
import { linkSchema, descriptionSchema } from "../schemas/post.schemas.js";
import { postLinkController, getPostController, getTimeLineController, getTrendingTags } from "../controllers/posts.controllers.js";


const postsRouter = Router();

postsRouter.post("/post",
    validateToken(tokenSchema),
    validateLink(linkSchema),
    validateDescription(descriptionSchema),
    postLinkController);

postsRouter.get("/post", validateToken(tokenSchema), getPostController);
postsRouter.get("/timeline", validateToken(tokenSchema), getTimeLineController);
postsRouter.get("/trending", validateToken(tokenSchema), getTrendingTags);

export default postsRouter;