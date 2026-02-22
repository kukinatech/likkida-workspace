import { Router } from "express";
import * as controller from "../controllers/authController.js";

const authRouter: Router = Router()
authRouter.post('/login', controller.loginController)
authRouter.post('/register', controller.registerController)

export default authRouter