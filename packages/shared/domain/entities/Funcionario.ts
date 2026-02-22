import { type TEmpresa } from "./Empresa"
import { type Entidade } from "./Entidade"
import { type TUser } from "./User"


export type TFuncionario = {
    id: string
    funcao: string
    empresa: TEmpresa | Entidade
    user: TUser | Entidade | null
    activo: boolean
}


export type TCreateFuncionarioInputDTO = Omit<TFuncionario, 'id'>
export type TUpdateFuncionarioInputDTO = Partial<TFuncionario>

export class Funcionario {
    id?: string
    funcao: string
    empresa: TEmpresa | Entidade
    user: TUser | Entidade | null
    activo: boolean

    constructor({ funcao, activo, empresa, user }: TCreateFuncionarioInputDTO) {
        this.funcao = funcao
        this.empresa = empresa
        this.user = user
        this.activo = activo
    }
    activar() {
        this.activo = true;
        return true
    }
    desativar() {
        this.activo = false;
        return true
    }
    addUser(user: TUser) {
        this.user = user;
    }
    addFuncao(funcao: string) {
        this.funcao = funcao;
    }
}