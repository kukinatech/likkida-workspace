import type { IUserRepository, TCreateUserInputDTO, TCreateUserOutputDTO } from "@likkida/shared";
import supabase from "../../../databases/supabase";


export class UserRepositorySupabase implements IUserRepository {
    async findById(id: string): Promise<TCreateUserOutputDTO | null> {
        const { error, data } = await supabase
            .from("users")
            .select()
            .eq("id", id);
        if (error) { throw new Error(error.message) }
        const [userFinded] = data
        const response = userFinded ? {
            id: userFinded.id,
            email: userFinded.email,
            username: userFinded.username
        } : null
        return response
    }
    async create({ username, email, password }: TCreateUserInputDTO): Promise<TCreateUserOutputDTO> {

        const { data: authData, error: authError } = await supabase.auth
            .signUp({ email, password: password! });

        if (authError) { throw new Error(authError.message); }

        const { data: userData, error: userError } = await supabase
            .from("users")
            .insert({ id: authData.user!.id, username, email })
            .select()
            .single()

        if (userError) { throw new Error(userError.message); }
        return {
            id: userData.id,
            email: userData.email,
            username: userData.username,
        }
    }
    async findByEmail(email: string): Promise<TCreateUserOutputDTO | null> {
        const { error, data } = await supabase
            .from("users")
            .select()
            .eq("email", email)

        if (error) { throw new Error(error.message) }

        const [userFinded] = data

        const response = userFinded ? {
            id: userFinded.id,
            email: userFinded.email,
            username: userFinded.username
        } : null
        return response
    }
}