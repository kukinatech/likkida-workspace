import { BaseErrorForm, type IAuthProvider, type TLoginUserOutputDTO } from "@likkida/shared";
import supabase from "../../../databases/supabase";

export class AuthProviderSupabase implements IAuthProvider {
  async signIn(email: string, password: string): Promise<TLoginUserOutputDTO> {
    const { error, data } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      if (error.code === "invalid_credentials")
        throw new BaseErrorForm('email', 'Email ou password inválida')
      throw new Error("Algo deu errado ao fazer login")
    }
    return {
      token: data.session.access_token,
      type_token: data.session.token_type
    }
  }
}