import {Email} from "../valueObjects/Email"
import {Password} from "../valueObjects/Password"
import {Username} from "../valueObjects/Username"

export type TUser = {
    id: string
    username: string
    email: string
    password: string
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
    constructor({ username, email, password }: TCreateUserInputDTO) {
        this.email = new Email(email)
        this.password = password ? new Password(password) : undefined;
        this.username = new Username(username)
    }
}