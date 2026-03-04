import { Router } from "express";
import * as controller from './EmpresaController.js'
const empresaRouter = Router()
empresaRouter.post('/', controller.createEmpresaController)

export default empresaRouter