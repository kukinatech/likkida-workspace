import type { IAuthProvider, TLoginUserOutputDTO } from "@likkida/shared";
import api from "../http/axios";

export class AuthProviderAxios implements IAuthProvider {
  async signIn(email: string, password: string): Promise<TLoginUserOutputDTO> {
    const response = await api.post<TLoginUserOutputDTO>('/auth/login', { password, email })
    return response.data
  }
}