import { type IUserRepository } from "../../adapters/UserRepository.js";
import { type TCreateUserInputDTO, type TCreateUserOutputDTO, User } from "../../domain/entities/User.js";
import { BaseErrorForm } from "../../domain/index.js";

export class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) { }
    async execute({ username, email, password }: TCreateUserInputDTO): Promise<TCreateUserOutputDTO> {
        const user = new User({ username, email, password })
        const userFinded = await this.userRepository.findByEmail(email)
        console.debug(userFinded)
        if (userFinded) { throw new BaseErrorForm('email', 'Usuário já existe.') }

        const response = await this.userRepository.create({
            email: user.email.get(),
            username: user.username.get(),
            password: user.password!.get()
        })
        return response
    }
}