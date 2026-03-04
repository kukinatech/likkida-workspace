import type { IEmpresaRepository, IFuncionarioRepository, IUserRepository } from "../../adapters/index.js";
import { AddUserToFuncionario } from "../funcionarios/AddUserToFuncionario.js";
import { Empresa } from "../../domain/index.js";
import type {
    TCreateEmpresaInputDTO,
    TCreateEmpresaOutputDTO,
    TCreateUserOutputDTO,
    TFuncionario
} from "../../domain/index.js";
// TODO: empresaRepository.create -> criar a empresa
// userRepository.create -> criar usuario 

// funcionarioRepository.create -> criar o funcionario
// com configurar o usuário como role=admin



export class CreateEmpresaUseCase {
    constructor(
        private empresaRepository: IEmpresaRepository,
        private funcionarioRepository: IFuncionarioRepository,
        private userRepository: IUserRepository
    ) { }
    async execute(dataDTO: TCreateEmpresaInputDTO): Promise<TCreateEmpresaOutputDTO & { user: TCreateUserOutputDTO } & { funcionario: TFuncionario }> {
        const empresaEntity = new Empresa(dataDTO)
        const empresa = await this.empresaRepository.create({
            nome: empresaEntity.nome,
            nif: empresaEntity.nif.get(),
            email: empresaEntity.email.get(),
            endereco: empresaEntity.endereco,
            contactos: empresaEntity.contactos,
            logoUrl: empresaEntity.logoUrl
        })
        const password = '123456'

        const user = await this.userRepository.create({
            email: empresa.email,
            password,
            username: empresaEntity.nome,
            empresa
        })
        const funcionario = await this.funcionarioRepository.create({
            activo: true,
            empresa,
            funcao: 'Administrador',
            user,
        })
        const addUserToFuncionario = new AddUserToFuncionario(
            this.funcionarioRepository
        )
        await addUserToFuncionario.execute(funcionario, user)

        return { ...empresa, funcionario, user }
    }
}