import { Email } from "../valueObjects/Email"
import { Password } from "../valueObjects/Password"
import { Username } from "../valueObjects/Username"
import type { TEmpresa } from "./Empresa"
import type { Entidade } from "./Entidade"

export type TUser = {
    id: string
    username: string
    email: string
    password: string
    empresa: Entidade | TEmpresa
}


export type TLoginUserInputDTO = Pick<TUser, 'email' | 'password'>
export type TLoginUserOutputDTO = { token: string; type_token: string }
export type TCreateUserInputDTO = Omit<TUser, 'id'> & Pick<Partial<TUser>, 'id'>
export type TCreateUserOutputDTO = Omit<TUser, 'password'>

export class User {
    id?: string
    username: Username
    email: Email
    password?: Password
    empresa: Entidade | TEmpresa
    constructor({ username, email, password, empresa }: TCreateUserInputDTO) {
        this.email = new Email(email)
        this.password = password ? new Password(password) : undefined;
        this.username = new Username(username)
        this.empresa = empresa
    }
}