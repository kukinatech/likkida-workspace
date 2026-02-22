
import { fakerPT_PT as faker } from "@faker-js/faker";
import { AddUserToFuncionario, CreateFuncionario, RecordNotFoundException, type TFuncionario } from "@likkida/shared";
import { describe, test, vi, expect } from "vitest";
import { EmpresaRepositorySupabase } from "../repositories/EmpresaRepositorySupabase.js";
import { FuncionarioRepositorySupabase } from "../repositories/FuncionarioRepositorySupabase.js";
import { UserRepositorySupabase } from "../repositories/UserRepositorySupabase.js";

const getFuncionario = (): TFuncionario => ({
    id: faker.string.ulid(),
    activo: true,
    empresa: { id: '0b5d3090-c0f6-435d-974a-0bceecad5417' },
    funcao: faker.word.adverb(),
    user: null
})
const getFuncionarioDesativado = (): TFuncionario => ({
    ...getFuncionario(),
    activo: false
})
describe('TESTES USECASE FUNCIONÁRIOS', function () {
    test('Deve criar um funcionario com sucesso', async function () {
        const funcionario: TFuncionario = getFuncionario()

        const EmpresaRepository = {
            findById: vi.fn().mockResolvedValue({ id: funcionario.empresa.id })
        };
        const FuncionarioRespository = {
            create: vi.fn().mockResolvedValue(undefined)
        };
        const creatorFuncionario = new CreateFuncionario(
            FuncionarioRespository as any,
            EmpresaRepository as any,
        )
        const user = { id: faker.string.uuid() }

        const response = creatorFuncionario.execute(funcionario)
        await expect(response).resolves.toBe(undefined)
    })

    test('Deve disparar um erro de usuário não encontrado ao vincular ao funcionario', async function () {
        const funcionario: TFuncionario = getFuncionario()

        const UserRepository = {
            findById: vi.fn().mockResolvedValue(null)
        };
        const FuncionarioRespository = {
            findById: vi.fn().mockResolvedValue(funcionario)
        };
        const addUserToFuncionario = new AddUserToFuncionario(
            FuncionarioRespository as any,
            UserRepository as any,
        )
        const user = { id: faker.string.uuid() }

        const response = addUserToFuncionario.execute(funcionario, user)
        await expect(response).rejects.toThrowError(new RecordNotFoundException('Usuário'))
    })
    test('Deve disparar um erro de funcionario não existe ao adiconar usuário', async function () {
        const funcionario: TFuncionario = getFuncionario()
        const user = { id: faker.string.uuid() }
        const UserRepository = {
            findById: vi.fn().mockResolvedValue(user)
        };
        const FuncionarioRespository = {
            findById: vi.fn().mockResolvedValue(null)
        };
        const addUserToFuncionario = new AddUserToFuncionario(
            FuncionarioRespository as any,
            UserRepository as any,
        )

        const response = addUserToFuncionario.execute(funcionario, user)
        await expect(response).rejects.toThrowError(new RecordNotFoundException('Funcionario'))
    })
    test('Deve disparar um erro de funcionario desativado', async function () {
        const funcionario: TFuncionario = getFuncionario()
        const user = { id: faker.string.uuid() }
        const UserRepository = {
            findById: vi.fn().mockResolvedValue(user)
        };
        const FuncionarioRespository = {
            findById: vi.fn().mockResolvedValue(getFuncionarioDesativado())
        };
        const addUserToFuncionario = new AddUserToFuncionario(
            FuncionarioRespository as any,
            UserRepository as any,
        )

        const response = addUserToFuncionario.execute(funcionario, user)
        await expect(response).rejects.toThrowError('Este funcionário está desativado.')
    })
    test('Deve adicionar o usuário ao funcionario', async function () {
        const funcionario: TFuncionario = getFuncionario()
        const user = { id: faker.string.uuid() }
        const UserRepository = {
            findById: vi.fn().mockResolvedValue(user)
        };
        const FuncionarioRespository = {
            findById: vi.fn().mockResolvedValue(getFuncionario()),
            update: vi.fn().mockResolvedValue(null)
        };
        const addUserToFuncionario = new AddUserToFuncionario(
            FuncionarioRespository as any,
            UserRepository as any,
        )

        const response = addUserToFuncionario.execute(funcionario, user)
        await expect(response).resolves.toBe(undefined)
    })

})

describe.skip('TESTES E2E FUNCIONÁRIOS', function () {
    test('Deve criar um funcionario com sucesso', async function () {
        const funcionario: TFuncionario = getFuncionario()
        const EmpresaRepository = new EmpresaRepositorySupabase()
        const FuncionarioRespository = new FuncionarioRepositorySupabase();
        const creatorFuncionario = new CreateFuncionario(
            FuncionarioRespository,
            EmpresaRepository,
        )
        const response = creatorFuncionario.execute(funcionario)
        await expect(response).resolves.toBe(undefined)
    })

    test('Deve vincular um usuário existente a um funcionário ativo (E2E)', async function () {
        const FuncionarioRepository = new FuncionarioRepositorySupabase()
        const UserRepository = new UserRepositorySupabase()
        const addUserToFuncionario = new AddUserToFuncionario(
            FuncionarioRepository,
            UserRepository,
        )

        const funcionarioId = '4cf1af28-bc2d-4b1f-a2d3-67108c79466e'
        const userId = '0d6682b9-212d-4cf0-84af-87a3296dae56'

        const funcionario = { id: funcionarioId }
        const user = { id: userId }

        const response = addUserToFuncionario.execute(funcionario, user)

        await expect(response).resolves.toBe(undefined)

        const funcionarioAtualizado = await FuncionarioRepository.findById(funcionarioId)
        expect(funcionarioAtualizado).toBeDefined()
        expect(funcionarioAtualizado?.user?.id).toBe(userId)
    })
})