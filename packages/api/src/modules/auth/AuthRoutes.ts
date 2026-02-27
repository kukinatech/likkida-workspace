import { Router } from "express";
import * as controller from './AuthController.js'
const authRouter = Router()
authRouter.post('/login', controller.loginController)
authRouter.post('/register', controller.registerController)

export default authRouter