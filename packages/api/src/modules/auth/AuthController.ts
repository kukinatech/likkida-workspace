import { type Request, type Response } from "express";
import {
  LoginUseCase,
  CreateUserUseCase,
  type TCreateUserInputDTO,
  type TLoginUserInputDTO,
  type IAuthProvider,
  RegisterUseCase
} from "@likkida/shared";

import { HttpResponseMapper } from "../../http/mappers.js";
import { AuthProviderSupabase } from "./providers/AuthProviderSupabase.js";

const authProvider: IAuthProvider = new AuthProviderSupabase()

export async function loginController(req: Request<{}, {}, TLoginUserInputDTO>, res: Response) {
  try {
    const loginUser = new LoginUseCase(authProvider)
    const response = await loginUser.execute(req.body.email, req.body.password!);

    res.cookie('token', `Bearer ${response.token}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 7 * (24 * 60 * 60 * 1000)
    })
    return res.status(200).json(
      HttpResponseMapper({
        message: 'Login feito com sucesso',
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
export async function registerController(req: Request<{}, {}, TCreateUserInputDTO>, res: Response) {
  try {
    const register = new RegisterUseCase(authProvider)
    const response = await register.execute({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      empresa: req.body.empresa
    });
    return res.status(200).json(
      HttpResponseMapper({
        message: 'Registro feito com sucesso',
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

export async function logoutController(req: Request, res: Response) {
  try {
    res.clearCookie('token')
    return res.status(200).json(
      HttpResponseMapper({
        message: 'Logout feito com sucesso',
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