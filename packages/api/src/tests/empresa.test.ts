

import { fakerPT_PT as faker } from "@faker-js/faker";
import { CreateEmpresaUseCase, Empresa, NifInvalidException, type TCreateEmpresaInputDTO } from "@likkida/shared";
import { describe, expect, test, vi, beforeEach } from "vitest";
import { EmpresaRepositorySupabase } from "../modules/empresas/repositories/EmpresaRepositorySupabase.js";
import { FuncionarioRepositorySupabase } from "../repositories/FuncionarioRepositorySupabase.js";
import { UserRepositorySupabase } from "../modules/users/repositories/UserRepositorySupabase.js";


const generateNifEmpresa = () => (
    `${faker.helpers.shuffle([1, 2, 5])[0]}${faker.helpers.replaceSymbols('#########')}`
)
const generateNifSingular = () => (`${faker.helpers.replaceSymbols('#########??###')}`)

describe('TESTES DE USECASES DA EMPRESA', function () {

    test('Deve disparar um erro quando o NIF inválido', function () {
        expect(() => {
            new Empresa({
                nome: faker.company.name(),
                nif: '1213',
                email: faker.internet.email(),
                endereco: faker.location.streetAddress(),
                contactos: [1, 2].map(() => faker.helpers.replaceSymbols('+244 9## ### ###'))
            })
        }).toThrowError(new NifInvalidException('nif', 'Nif Inválido'))
    })
    test('O NIF deve ser válido', function () {
        expect(() => {
            new Empresa({
                nome: faker.company.name(),
                nif: generateNifSingular(),
                email: faker.internet.email(),
                endereco: faker.location.streetAddress(),
                contactos: [1, 2].map(() => faker.helpers.replaceSymbols('+244 9## ### ###'))
            })
        }).not.toThrowError(new NifInvalidException('nif', 'Nif Inválido'))
    })
    test('Deve criar empresa com sucesso.', async function () {
        const empresaRepository = {
            create: vi.fn().mockResolvedValue({ id: faker.string.uuid() })
        }
        const funcionarioRepository = {
            create: vi.fn().mockResolvedValue({ id: faker.string.uuid(), activo: true }),
            update: vi.fn().mockResolvedValue({ id: faker.string.uuid(), activo: true })
        }
        const userRepository = {
            create: vi.fn().mockResolvedValue({ id: faker.string.uuid(), })
        }
        const builder = new CreateEmpresaUseCase(
            empresaRepository as any,
            funcionarioRepository as any,
            userRepository as any
        )

        const empresaDto: TCreateEmpresaInputDTO = {
            nome: faker.company.name(),
            nif: generateNifEmpresa(),
            email: faker.internet.email(),
            endereco: faker.location.streetAddress(),
            contactos: [1, 2].map(() => faker.helpers.replaceSymbols('+244 9## ### ###'))
        }
        const response = builder.execute(empresaDto);

        expect(response).resolves.toHaveProperty('id')
    })
})

describe.skip('TESTES END-to-ENDD DA EMPRESA', function () {

    test('Deve criar uma empresa', async function () {
        const empresaRepositorySupabase = new EmpresaRepositorySupabase()
        const funcionarioRepositorySupabase = new FuncionarioRepositorySupabase()
        const userRepositorySupabase = new UserRepositorySupabase()

        const empresa = new Empresa({
            nome: faker.company.name(),
            nif: generateNifEmpresa(),
            email: faker.internet.email(),
            endereco: faker.location.streetAddress(),
            contactos: [1, 2].map(() => faker.helpers.replaceSymbols('+244 9## ### ###'))
        })
        const creator = new CreateEmpresaUseCase(
            empresaRepositorySupabase,
            funcionarioRepositorySupabase,
            userRepositorySupabase
        )
        const response = creator.execute({
            contactos: empresa.contactos,
            email: empresa.email.get(),
            endereco: empresa.endereco,
            nif: empresa.nif.get(),
            nome: empresa.nome,
            logoUrl: empresa.logoUrl
        })
        console.debug(await response)
        expect(response).resolves.toHaveProperty('id')
    })
})