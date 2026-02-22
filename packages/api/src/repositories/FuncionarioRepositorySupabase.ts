import { IFuncionarioRepository, TCreateFuncionarioInputDTO, TFuncionario, TUpdateFuncionarioInputDTO } from "@likkida/shared";
import supabase from "../databases/supabase";

export class FuncionarioRepositorySupabase implements IFuncionarioRepository {
    async create(data: TCreateFuncionarioInputDTO): Promise<void> {
        const { error } = await supabase.from('funcionarios')
            .insert({
                activo: data.activo ?? true,
                empresa_id: data.empresa.id,
                funcao: data.funcao,
                user_id: data.user?.id ?? null
            })
        
        if (error) {
            throw new Error('Erro ao criar funcionario: ' + error.message)
        }
    }
    async update(id: string, data: TUpdateFuncionarioInputDTO): Promise<void> {
        const { error } = await supabase.from('funcionarios')
            .update({
                activo: data.activo,
                empresa_id: data.empresa?.id ?? undefined,
                funcao: data.funcao ?? undefined,
                user_id: data.user?.id ?? undefined
            })
            .eq('id', id)
        
        if (error) {
            throw new Error('Erro ao atualizar funcionario: ' + error.message)
        }
    }
    async findById(id: string): Promise<TFuncionario | null> {
        const { error, data } = await supabase.from('funcionarios')
            .select()
            .eq('id', id)
            .maybeSingle()

        if (error) {
            throw new Error('Erro ao encontrar funcionario: ' + error.message)
        }
        if (!data) return null;

        return {
            id: data.id,
            activo: data?.activo ?? false,
            empresa: { id: data.empresa_id },
            funcao: data.funcao ?? '',
            user: data.user_id ? { id: data.user_id } : null,
        }
    }
}