import { Router, type Express } from 'express'
import authRouter from './authRoutes.js'
import userRouter from './userRoutes.js'
import empresaRouter from './empresaRoutes.js'


export default function bootstrap(app: Express) {
    const apiRouter = Router()
    apiRouter.use('/auth', authRouter)
    apiRouter.use('/users', userRouter)
    apiRouter.use('/empresas', empresaRouter)

    //api router
    app.use('/api', apiRouter)
}