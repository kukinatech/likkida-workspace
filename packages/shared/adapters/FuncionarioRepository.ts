import type { TCreateFuncionarioInputDTO, TFuncionario, TUpdateFuncionarioInputDTO } from "../domain"

export interface IFuncionarioRepository {
    create(data: TCreateFuncionarioInputDTO): Promise<void>
    update(id: string, data: TUpdateFuncionarioInputDTO): Promise<void>
    findById(id: string): Promise<TFuncionario | null>
} 