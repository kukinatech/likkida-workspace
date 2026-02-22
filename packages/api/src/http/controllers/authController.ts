
import { type Request, type Response } from "express";
import {
    BaseErrorForm,
    type IUserRepository,
    LoginUser,
    RegisterUser,
    type TCreateUserInputDTO,
    type TLoginUserInputDTO
} from "@likkida/shared";
import { UserRepositorySupabase } from "../../repositories/UserRepositorySupabase.js";
import { HttpResponseMapper } from "../mappers.js";

const userRepository: IUserRepository = new UserRepositorySupabase();

export async function loginController(req: Request<{}, {}, TLoginUserInputDTO>, res: Response) {
    try {
        const loginUser = new LoginUser(userRepository)
        const response = await loginUser.execute(req.body.email, req.body.password!);
        return res.status(200)
            .json(HttpResponseMapper(false, 'Login feito com sucesso', response))
    } catch (error: any) {
        return res.status(400).json(HttpResponseMapper(true, error.message))
    }
}
export async function registerController(req: Request<{}, {}, TCreateUserInputDTO>, res: Response) {
    try {
        const register = new RegisterUser(userRepository)
        const response = await register.execute({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        return res.status(200)
            .json(HttpResponseMapper(false, 'Registro feito com sucesso', response))
    } catch (error: any) {
        const errors = {}
        if (error instanceof BaseErrorForm) {
            Object.assign(errors, { [error.field]: error.message })
        }
        return res.status(400).json(HttpResponseMapper(true, error.message))
    }
}
