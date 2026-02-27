import { type Request, type Response } from "express";
import {
    type IUserRepository,
    LoginUseCase,
    CreateUserUseCase,
    type TCreateUserInputDTO,
    type TLoginUserInputDTO,
    type IAuthProvider
} from "@likkida/shared";

import { UserRepositorySupabase } from "../user/repositories/UserRepositorySupabase.js";
import { HttpResponseMapper } from "../../http/mappers.js";
import { AuthProviderSupabase } from "./providers/AuthProviderSupabase.js";

const userRepository: IUserRepository = new UserRepositorySupabase();
const authProvider: IAuthProvider = new AuthProviderSupabase()

export async function loginController(req: Request<{}, {}, TLoginUserInputDTO>, res: Response) {
    try {
        const loginUser = new LoginUseCase(authProvider)
        const response = await loginUser.execute(req.body.email, req.body.password!);
        return res.status(200)
            .json(HttpResponseMapper({
                isError: false,
                message: 'Login feito com sucesso',
                data: response
            }))
    } catch (error: any) {
        return res.status(400).json(HttpResponseMapper({
            isError: true,
            message: error.message,
            error
        }))
    }
}
export async function registerController(req: Request<{}, {}, TCreateUserInputDTO>, res: Response) {
    try {
        const register = new CreateUserUseCase(userRepository)
        const response = await register.execute({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        return res.status(200).json(
            HttpResponseMapper({
                isError: false,
                message: 'Registro feito com sucesso',
                data: response
            })
        )
    } catch (error: any) {
        return res.status(400).json(
            HttpResponseMapper({
                isError: true,
                message: error.message,
                error
            })
        )
    }
}