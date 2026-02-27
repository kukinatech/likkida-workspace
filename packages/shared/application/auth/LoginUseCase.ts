import type { IAuthProvider } from "../../adapters/AuthProvider.js";
import { type TLoginUserOutputDTO } from "../../domain/entities/User.js";
import { Email } from "../../domain/valueObjects/Email.js";
import { Password } from "../../domain/valueObjects/Password.js";

export class LoginUseCase {
    constructor(private authProvider: IAuthProvider) { }
    async execute(email: string, password: string): Promise<TLoginUserOutputDTO> {
        const _email = new Email(email);
        const _password = new Password(password);
        const response = await this.authProvider.signIn(_email.get(), _password.get())
        return response;
    }
}