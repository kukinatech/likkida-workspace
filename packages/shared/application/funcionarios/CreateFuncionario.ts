import { type IEmpresaRepository } from "../../adapters/EmpresaRepository.js";
import { type IFuncionarioRepository } from "../../adapters/FuncionarioRepository.js";
import { Funcionario, type TCreateFuncionarioInputDTO } from "../../domain/entities/Funcionario.js";
import { RecordNotFoundException } from "../../domain/Exceptions/RecordNotFoundException.js";

export class CreateFuncionario {
    constructor(
        private funcionarioRepository: IFuncionarioRepository,
        private empresaRepository: IEmpresaRepository
    ) { }
    async execute(data: TCreateFuncionarioInputDTO): Promise<void> {
        const findEmpresa = await this.empresaRepository.findById(data.empresa.id)
        if (!findEmpresa) {
            throw new RecordNotFoundException('Empresa')
        }
        const funcionario = new Funcionario({
            activo: data.activo ?? true,
            empresa: data.empresa,
            funcao: data.funcao,
            user: data.user ?? null
        })
        await this.funcionarioRepository.create(funcionario)
    }
}