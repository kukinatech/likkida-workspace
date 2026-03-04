import { Router } from "express";
import * as controller from './AuthController.js'
import { auth } from "../../http/middlewares/auth.js";
const authRouter = Router()
authRouter.post('/login', controller.loginController)
authRouter.get('/logout', [auth], controller.logoutController)
authRouter.post('/register', controller.registerController)

export default authRouter