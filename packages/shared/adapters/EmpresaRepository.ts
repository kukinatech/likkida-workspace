import type { TCreateEmpresaInputDTO, TCreateEmpresaOutputDTO, TEmpresa } from "../domain"


export interface IEmpresaRepository {
    create(data: TCreateEmpresaInputDTO): Promise<TCreateEmpresaOutputDTO>
    findById(id: string): Promise<TEmpresa | null>
    findByNif(nif: string): Promise<TEmpresa | null>
}