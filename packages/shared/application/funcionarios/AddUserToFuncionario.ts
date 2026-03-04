import { type IFuncionarioRepository } from "../../adapters/FuncionarioRepository.js";
import { type IUserRepository } from "../../adapters/UserRepository.js";
import { type Entidade } from "../../domain/entities/Entidade.js";
import { RecordNotFoundException } from "../../domain/Exceptions/RecordNotFoundException.js";
import type { TCreateUserOutputDTO, TFuncionario} from "../../domain/index.js";

export class AddUserToFuncionario {
    constructor(
        private FuncionarioRepository: IFuncionarioRepository,
        private UserRepository?: IUserRepository,
    ) { }
    async executeByEntity(funcionario: Entidade, user: Entidade) {
        if (!this.UserRepository) {
            throw new Error('Erro ao adicionar usuário ao funcionário');
        }
        const findUser = await this.UserRepository.findById(user.id)
        if (!findUser) {
            throw new RecordNotFoundException('Usuário')
        }
        const findFuncionario = await this.FuncionarioRepository.findById(funcionario.id)
        if (!findFuncionario) {
            throw new RecordNotFoundException('Funcionario')
        }
        if (!findFuncionario.activo) {
            throw new Error('Este funcionário está desativado.')
        }
        await this.FuncionarioRepository.update(funcionario.id, { user: findUser })
    }
    async execute(funcionario: TFuncionario, user: TCreateUserOutputDTO) {

        if (!funcionario.activo) {
            throw new Error('Este funcionário está desativado.')
        }
        await this.FuncionarioRepository.update(funcionario.id, { user })
    }
}