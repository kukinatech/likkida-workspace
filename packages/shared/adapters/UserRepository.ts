import type { TCreateUserInputDTO, TCreateUserOutputDTO, TLoginUserOutputDTO } from "../domain/index.js"

export interface IUserRepository {
    login(email: string, password: string): Promise<TLoginUserOutputDTO>
    create(userinputData: TCreateUserInputDTO): Promise<TCreateUserOutputDTO>
    findByEmail(email: string): Promise<TCreateUserOutputDTO | null>
    findById(id: string): Promise<TCreateUserOutputDTO | null>
}