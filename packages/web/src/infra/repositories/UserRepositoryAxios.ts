import type { THttpResponse,  IUserRepository,  TCreateUserInputDTO,  TCreateUserOutputDTO } from "@likkida/shared";
import BaseRepositoryAxios from "./BaseRepositoryAxios";
import axio from "../http/axios";

export class UserRepositoryAxios extends BaseRepositoryAxios<TCreateUserInputDTO, TCreateUserOutputDTO> implements IUserRepository {
  constructor() { super('users') }
  async findByEmail(email: string): Promise<TCreateUserOutputDTO | null> {
    const { data: response } = await axio.get<THttpResponse<TCreateUserOutputDTO[]>>(this.getBaseUrl(), { params: { email } })
    if(response.data.length == 0) return null; 
    return response.data[0]
  }
}