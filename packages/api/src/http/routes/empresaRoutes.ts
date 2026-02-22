import { Router } from "express";
import * as controller from '../controllers/empresaController.js'
const empresaRouter = Router()
empresaRouter.post('/', controller.createEmpresaController)
empresaRouter.get('/:id', () => {})

export default empresaRouter