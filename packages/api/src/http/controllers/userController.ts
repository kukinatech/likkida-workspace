import { type IUserRepository } from "@likkida/shared";
import { type Request, type Response } from "express"

import { HttpResponseMapper } from "../mappers.js";
import { UserRepositorySupabase } from "../../repositories/UserRepositorySupabase.js";

const userRepository: IUserRepository = new UserRepositorySupabase();

export const userGetMeController = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id
        const user = await userRepository.findById(userId)
        if (!user) {
            return res.status(404).json(HttpResponseMapper(true, 'Usuário não foi encontrado'))
        }

        return res.status(200).json(HttpResponseMapper(false, 'usuário encontrado', user))
    } catch (error: any) {
        return res.status(400).json({ error: true, message: error.message })
    }
}