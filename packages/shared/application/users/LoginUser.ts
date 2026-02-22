import type { IUserRepository } from "../../adapters/UserRepository.js";
import { type TLoginUserOutputDTO } from "../../domain/entities/User.js";
import { Email } from "../../domain/valueObjects/Email.js";
import { Password } from "../../domain/valueObjects/Password.js";

export class LoginUser {
    constructor(private UserRepository: IUserRepository) { }
    async execute(email: string, password: string): Promise<TLoginUserOutputDTO> {
        const _email = new Email(email);
        const _password = new Password(password);
        const response = await this.UserRepository.login(_email.get(), _password.get())
        return response;
    }
}