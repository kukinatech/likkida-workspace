import api from "../../../infrastructure/http/axios";

export default class RegisterService {
  async execute(username: string, password: string, email: string): Promise<void> {
      await api.post('auth/register', { username, password, email })
  }
}