

import { fakerPT_PT as faker } from "@faker-js/faker";
import { CreateEmpresa, Empresa, NifInvalidException, type TCreateEmpresaInputDTO } from "@likkida/shared";
import { describe, expect, test, vi, beforeEach } from "vitest";
import { EmpresaRepositorySupabase } from "../repositories/EmpresaRepositorySupabase.js";


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
        }).toThrowError(new NifInvalidException())
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
        }).not.toThrowError(new NifInvalidException())
    })
    test('Deve criar empresa com sucesso.', async function () {
        const empresaRepository = {
            create: vi.fn().mockResolvedValue({ id: faker.string.uuid() })
        }
        const builder = new CreateEmpresa(empresaRepository as any)
        const empresaDto: TCreateEmpresaInputDTO = {
            nome: faker.company.name(),
            nif: generateNifEmpresa(),
            email: faker.internet.email(),
            endereco: faker.location.streetAddress(),
            contactos: [1, 2].map(() => faker.helpers.replaceSymbols('+244 9## ### ###'))
        }
        await expect(builder.execute(empresaDto)).resolves.toBe(undefined)
    })
})

describe.skip('TESTES END-to-ENDD DA EMPRESA', function () {

    test('Deve criar uma empresa', async function () {
        const empresaRepositorySupabase = new EmpresaRepositorySupabase()
        const empresa = new Empresa({
            nome: faker.company.name(),
            nif: generateNifEmpresa(),
            email: faker.internet.email(),
            endereco: faker.location.streetAddress(),
            contactos: [1, 2].map(() => faker.helpers.replaceSymbols('+244 9## ### ###'))
        })
        const creator = new CreateEmpresa(empresaRepositorySupabase)
        const response = creator.execute({
            contactos: empresa.contactos,
            email: empresa.email.get(),
            endereco: empresa.endereco,
            nif: empresa.nif.get(),
            nome: empresa.nome,
            logoUrl: empresa.logoUrl
        })
        expect(response).resolves.toBe(undefined)
    })
})