
import { Router } from "express";
import postsRouter from "./posts.routes.js";
import userRouter from "./user.routes.js";

const router = Router();
router.use(postsRouter);
router.use(userRouter);

export default router;