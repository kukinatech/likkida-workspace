import type { IAuthProvider, TCreateUserInputDTO } from "@likkida/shared";

export class RegisterService {
  constructor(private authProvider: IAuthProvider) { }
  async execute({ email, password, username, empresa }: TCreateUserInputDTO) {
    return await this.authProvider.signUp({ email, password, username, empresa })
  }
}