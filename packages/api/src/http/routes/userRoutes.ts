import { Router } from "express";
import { userGetMeController } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/auth.js";

const userRouter: Router = Router()

userRouter.get('/me', authMiddleware, userGetMeController)

export default userRouter;