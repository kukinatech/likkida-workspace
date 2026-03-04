import type { IAuthProvider } from "../../adapters/AuthProvider.js";
import { type TCreateUserInputDTO, type TCreateUserOutputDTO } from "../../domain/entities/User.js";
import { Username } from "../../domain/index.js";
import { Email } from "../../domain/valueObjects/Email.js";
import { Password } from "../../domain/valueObjects/Password.js";

export class RegisterUseCase {
  constructor(private authProvider: IAuthProvider) { }
  async execute({ email, password, username, empresa }: TCreateUserInputDTO): Promise<TCreateUserOutputDTO> {
    const _email = new Email(email);
    const _password = new Password(password);
    const _username = new Username(username)
    const response = await this.authProvider.signUp({
      email: _email.get(),
      password: _password.get(),
      username: _username.get(),
      empresa
    })
    return response;
  }
}