import { type Request, type Response } from "express"
import { HttpResponseMapper } from "../../http/mappers.js"
import { CreateEmpresa, type IEmpresaRepository, type TCreateEmpresaInputDTO } from "@likkida/shared";
import { EmpresaRepositorySupabase } from "./repositories/EmpresaRepositorySupabase.js";

const empresaRepository: IEmpresaRepository = new EmpresaRepositorySupabase();
export async function createEmpresaController(req: Request<{}, {}, TCreateEmpresaInputDTO>, res: Response) {
    try {
        const creator = new CreateEmpresa(empresaRepository)
        const response = await creator.execute(req.body)
        return res.status(201)
            .json(HttpResponseMapper({
                isError: false,
                message: 'Empresa criada com sucesso.',
                response
            }))
    } catch (error: any) {
        return res.status(400)
            .json(HttpResponseMapper({
                isError: true,
                message: error.message,
                error
            }))
    }
}  