import HttpApi from "../../../infrastructure/http/axios";

export default class RegisterService {
  async execute(username: string, password: string, email: string): Promise<void> {
    await HttpApi.post('auth/register', { username, password, email })
  }
}