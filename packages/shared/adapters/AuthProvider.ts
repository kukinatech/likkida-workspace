import type {
  TLoginUserOutputDTO
} from "../domain";

export interface IAuthProvider {
  signIn(email: string, password: string): Promise<TLoginUserOutputDTO>
}