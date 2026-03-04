import supabase from "../../../databases/supabase";
import type {
    IEmpresaRepository,
    TCreateEmpresaInputDTO,
    TEmpresa,
    TCreateEmpresaOutputDTO
} from "@likkida/shared";

export class EmpresaRepositorySupabase implements IEmpresaRepository {
    findByNif(nif: string): Promise<TEmpresa | null> {
        throw new Error("findByNif Method not implemented.");
    }
    async findById(id: string): Promise<TEmpresa | null> {
        const { error, data } = await supabase.from('empresas')
            .select()
            .eq('id', id)
            .maybeSingle()
        if (error) {
            throw new Error('Erro ao encontrar empresa: ' + error.message)
        }
        if (!data) return null;

        return {
            id: data.id,
            nome: data.nome,
            contactos: data.contactos ?? [],
            email: data.email,
            endereco: data.endereco ?? '',
            logoUrl: data.logo_url,
            nif: data.nif,
        }
    }
    async create(data: TCreateEmpresaInputDTO): Promise<TCreateEmpresaOutputDTO> {
        const { error, data: empresa } = await supabase.from('empresas')
            .insert({
                nome: data.nome,
                nif: data.nif,
                email: data.email,
                endereco: data.endereco,
                contactos: data.contactos,
                logo_url: data.logoUrl
            })
            .select()
            .single()

        if (error) {
            throw new Error('Erro ao criar empresa: ' + error.message)
        }
        return {
            id: empresa.id,
            nome: empresa.nome,
            nif: empresa.nif,
            email: empresa.email,
            endereco: empresa.endereco ?? '',
            contactos: empresa.contactos ?? [],
            logoUrl: empresa.logo_url
        }
    }
}