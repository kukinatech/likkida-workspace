import { type Request, type Response } from "express"
import { HttpResponseMapper } from "../../http/mappers.js"
import { UserRepositorySupabase } from "./repositories/UserRepositorySupabase.js";
import { type IUserRepository } from "@likkida/shared";

const userRepository: IUserRepository = new UserRepositorySupabase();
export const userGetMeController = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id
    const response = await userRepository.findById(userId)
    if (!response) {
      return res.status(404).json(HttpResponseMapper({
        message: 'Usuário não foi encontrado',
      }))
    }
    return res.status(200).json(HttpResponseMapper({
      message: 'User acessado',
      data: response
    }))
  } catch (error: any) {
    return res.status(400).json(
      HttpResponseMapper({
        message: error.message,
        error
      })
    )
  }
}
type TUserQueryString = {
  email: string
}
export const userGetAllController = async (req: Request<{}, {}, {}, TUserQueryString>, res: Response) => {
  try {
    if ('email' in req.query) {
      const response = await userRepository.findByEmail(req.query.email)
      console.log(response)
      return res.status(200).json(
        HttpResponseMapper({
          message: 'Usuarios encontrado.',
          data: response ? [response] : []
        })
      )
    }
    return res.status(200).json(
      HttpResponseMapper({
        message: 'Usuarios encontrado.',
        data: []
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