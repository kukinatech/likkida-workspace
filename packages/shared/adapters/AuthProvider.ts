import type {
  TCreateUserInputDTO,
  TCreateUserOutputDTO,
  TLoginUserOutputDTO
} from "../domain";

export interface IAuthProvider {
  signIn(email: string, password: string): Promise<TLoginUserOutputDTO>
  signUp(data: TCreateUserInputDTO): Promise<TCreateUserOutputDTO>
  me(): Promise<TCreateUserOutputDTO | null>
  logout(): Promise<void>
}