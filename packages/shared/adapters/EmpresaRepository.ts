import type { TCreateEmpresaInputDTO, TEmpresa } from "../domain"


export interface IEmpresaRepository {
    create(data: TCreateEmpresaInputDTO): Promise<void>
    findById(id: string): Promise<TEmpresa | null>
    findByNif(nif: string): Promise<TEmpresa | null>
}