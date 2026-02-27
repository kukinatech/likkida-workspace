import type { TCreateUserInputDTO, TCreateUserOutputDTO } from "../domain/index.js"

export interface IUserRepository {
    create(userinputData: TCreateUserInputDTO): Promise<TCreateUserOutputDTO>
    findByEmail(email: string): Promise<TCreateUserOutputDTO | null>
    findById(id: string): Promise<TCreateUserOutputDTO | null>
}