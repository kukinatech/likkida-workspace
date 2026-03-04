import type {
  IAuthProvider,
  TCreateUserInputDTO,
  TCreateUserOutputDTO,
  TLoginUserOutputDTO
} from "@likkida/shared";
import axio from "../http/axios";

export class AuthProviderAxios implements IAuthProvider {
  async signIn(email: string, password: string): Promise<TLoginUserOutputDTO> {
    const response = await axio.post<TLoginUserOutputDTO>('/auth/login', { password, email })
    return response.data
  }
  async signUp({ email, password, username, empresa }: TCreateUserInputDTO) {
    const { data: response } = await axio.post<TCreateUserOutputDTO>('/auth/register', { password, email, username, empresa })
    return response
  }
  async me(): Promise<TCreateUserOutputDTO | null> {
    try {
      const res = await axio.get('/users/me')
      return res.data.data
    } catch (error: any) {
      if (error?.response?.status === 401) return null
      throw error
    }
  }
  async logout(): Promise<void> {
    await axio.get('/auth/logout')
  }

}