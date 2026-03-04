import { BaseErrorForm, type IUserRepository, type TCreateUserInputDTO, type TCreateUserOutputDTO } from "@likkida/shared";
import supabase from "../../../databases/supabase";


export class UserRepositorySupabase implements IUserRepository {
    async findById(id: string): Promise<TCreateUserOutputDTO | null> {
        const { error, data } = await supabase
            .from("users")
            .select()
            .eq("id", id)

        if (error) { throw new Error(error.message) }
        const [user] = data
        const response = user ? {
            id: user.id,
            email: user.email,
            username: user.username,
            empresa: { id: user.empresa_id }
        } as TCreateUserOutputDTO : null

        return response
    }
    async create({ username, email, password, empresa }: TCreateUserInputDTO): Promise<TCreateUserOutputDTO> {

        let { data: user, error } = await supabase.from('users')
            .select('email')
            .eq('email', email)
            .maybeSingle()
        if (error) throw new Error(error.message);

        if (user) throw new BaseErrorForm('email', 'Email já existe usa outro email')

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
            empresa: { id: empresa.id }
        }
    }
    async findByEmail(email: string): Promise<TCreateUserOutputDTO | null> {
        const { error, data } = await supabase
            .from("users")
            .select()
            .eq("email", email)

        if (error) { throw new Error(error.message) }

        const [user] = data

        const response = user ? {
            id: user.id,
            email: user.email,
            username: user.username,
            empresa: { id: user.id }
        } as TCreateUserOutputDTO : null
        return response
    }
}