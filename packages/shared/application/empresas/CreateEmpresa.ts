import { type IEmpresaRepository } from "../../adapters/index.js";
import { Empresa, type TCreateEmpresaInputDTO, type TCreateEmpresaOutputDTO } from "../../domain/index.js";

export class CreateEmpresa {
    constructor(private empresaRepository: IEmpresaRepository) { }
    async execute(dataDTO: TCreateEmpresaInputDTO): Promise<TCreateEmpresaOutputDTO> {
        const empresa = new Empresa(dataDTO)
        const response = await this.empresaRepository.create({
            nome: empresa.nome,
            nif: empresa.nif.get(),
            email: empresa.email.get(),
            endereco: empresa.endereco,
            contactos: empresa.contactos,
            logoUrl: empresa.logoUrl
        })
        return response
    }
}