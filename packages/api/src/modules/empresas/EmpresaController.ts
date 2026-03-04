import { type Request, type Response } from "express"
import { HttpResponseMapper } from "../../http/mappers.js"
import { CreateEmpresaUseCase, type IEmpresaRepository, type IFuncionarioRepository, type IUserRepository, type TCreateEmpresaInputDTO } from "@likkida/shared";
import { EmpresaRepositorySupabase } from "./repositories/EmpresaRepositorySupabase.js";
import { UserRepositorySupabase } from "../users/repositories/UserRepositorySupabase.js";
import { FuncionarioRepositorySupabase } from "../../repositories/FuncionarioRepositorySupabase.js";

const empresaRepository: IEmpresaRepository = new EmpresaRepositorySupabase();
const userRepository: IUserRepository = new UserRepositorySupabase();
const funcionarioRepository: IFuncionarioRepository = new FuncionarioRepositorySupabase();

export async function createEmpresaController(req: Request<{}, {}, TCreateEmpresaInputDTO>, res: Response) {
    try {
        const creator = new CreateEmpresaUseCase(
            empresaRepository,
            funcionarioRepository,
            userRepository
        )
        const response = await creator.execute(req.body)

        return res.status(201).json(
            HttpResponseMapper({
                message: 'Empresa criada com sucesso.',
                data: response
            })
        )
    } catch (error: any) {
        return res.status(400).json(
            HttpResponseMapper({
                message: error.message,
                error
            })
        )
    }
}  