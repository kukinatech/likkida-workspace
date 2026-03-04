import { Router } from "express";
import { userGetMeController, userGetAllController } from "./UserController.js";
import { auth } from "../../http/middlewares/auth.js";

const userRouter: Router = Router()
userRouter.get('/', userGetAllController);
userRouter.get('/me', [auth], userGetMeController)

export default userRouter;