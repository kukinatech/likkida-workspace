import { BaseErrorForm, type IAuthProvider, type TCreateUserInputDTO, type TCreateUserOutputDTO, type TLoginUserOutputDTO } from "@likkida/shared";
import supabase from "../../../databases/supabase";

export class AuthProviderSupabase implements IAuthProvider {
  async signUp({ email, password, username, empresa }: TCreateUserInputDTO): Promise<TCreateUserOutputDTO> {

    let { data: user, error } = await supabase.from('users')
      .select('email')
      .eq('email', email)
      .maybeSingle()
    if (error) throw new Error(error.message);
    if (user) throw new BaseErrorForm('email', 'email inválido')

    const { data: authData, error: authError } = await supabase.auth
      .signUp({ email, password: password! });


    if (authError) { throw new Error(authError.message); }

    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert({
        id: authData.user!.id,
        username,
        email,
        empresa_id: empresa.id
      })
      .select()
      .single()

    if (userError) { throw new Error(userError.message); }
    return {
      id: userData.id,
      email: userData.email,
      username: userData.username,
      empresa
    }
  }
  async signIn(email: string, password: string): Promise<TLoginUserOutputDTO> {
    const { error, data } = await supabase.auth.signInWithPassword({ email, password })
    if (error && error.code === "invalid_credentials") {
      throw new BaseErrorForm('password', 'Email ou password inválida')
    }
    if (error) {
      throw new Error("Algo deu errado ao fazer login: " + error.message)
    }
    return {
      token: data.session.access_token,
      type_token: data.session.token_type
    }
  }
  //@ts-ignore
  async me(): Promise<TCreateUserOutputDTO | null> { }
  async logout(): Promise<void> { }
}