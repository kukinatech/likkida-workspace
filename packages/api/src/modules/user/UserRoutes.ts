import { Router } from "express";
import { userGetMeController, userGetAllController } from "./UserController.js";
import { authMiddleware } from "../../http/middlewares/auth.js";

const userRouter: Router = Router()
userRouter.get('/', userGetAllController);
userRouter.get('/me', authMiddleware, userGetMeController)

export default userRouter;