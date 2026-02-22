
import { test, vi, expect, describe } from "vitest";

import { beforeEach } from "vitest";
import { fakerPT_PT as faker } from '@faker-js/faker'
import { type IUserRepository, LoginUser, RegisterUser,type TCreateUserOutputDTO, type TLoginUserInputDTO } from "@likkida/shared";
import { UserRepositorySupabase } from "../repositories/UserRepositorySupabase.js";

describe('TESTES USECASES DE LOGIN', function () {
    test('Deve disparar erro de email inválido', async function () {
        const userRepository = {
            login: vi.fn().mockResolvedValue(null)
        }
        userRepository.login = vi.fn().mockResolvedValue({ login: 'token', type_token: 'type_token' })
        const loginUser = new LoginUser(userRepository as any);
        await expect(loginUser.execute('admin', 'password')).rejects.toThrow('Email Inválido')
    })
    test('Deve disparar erro de password inválido', async function () {
        const userRepository = {
            login: vi.fn().mockResolvedValue(null)
        }
        const loginUser = new LoginUser(userRepository as any);
        await expect(loginUser.execute('admin@gmail.com', '')).rejects.toThrow('Password Inválida')
    })
    test('Deve realizar login com sucesso', async function () {
        const repositoryResponse = { token: 'token', type_token: 'type_token' };
        const userRepository = {
            login: vi.fn().mockResolvedValue(repositoryResponse)
        }
        const loginUser = new LoginUser(userRepository as any);
        const response = await loginUser.execute('admin@gmail.com', 'password')
        expect(response).toEqual(repositoryResponse)
    })
})

describe('TESTES USECASES REGISTRO DE USUÁRIO', async function () {
    test('Deve disparar erro de email inválido ', async function () {
        const username = faker.person.firstName();
        const email = 'email';
        const password = '123456'
        const userOutputDTO = {
            id: faker.string.uuid(),
            email,
            username
        }
        const userRepository = {
            create: vi.fn().mockResolvedValue(userOutputDTO as TCreateUserOutputDTO),
            findByEmail: vi.fn().mockResolvedValue(null)
        }
        const register = new RegisterUser(userRepository as any);
        const response = register.execute({ username, email, password })
        await expect(response).rejects.toThrow('Email Inválido')
    })

    test('Deve disparar erro de usuário já existente', async function () {
        const username = 'meunome';
        const email = 'email@gmail.com';
        const password = 'password'
        const userOutputDTO = {
            id: 'esgywfgyiw',
            email,
            username
        }
        const userRepository = {
            create: vi.fn().mockResolvedValue(userOutputDTO as TCreateUserOutputDTO),
            findByEmail: vi.fn().mockResolvedValue(userOutputDTO)
        }
        const register = new RegisterUser(userRepository as any);
        const response = register.execute({ username, email, password })
        await expect(response).rejects.toThrow('Usuário já existe.')
    })
    test('Deve registrar o usuário com sucesso', async function () {
        const username = 'meunome';
        const email = 'email@gmail.com';
        const password = 'password'
        const userOutputDTO = {
            id: 'esgywfgyiw',
            email,
            username
        }
        const userRepository = {
            create: vi.fn().mockResolvedValue(userOutputDTO as TCreateUserOutputDTO),
            findByEmail: vi.fn().mockResolvedValue(null)
        }
        const register = new RegisterUser(userRepository as any);
        const response = register.execute({ username, email, password })
        await expect(response).resolves.toBe(userOutputDTO)
    })
})

describe.skip('TEST END-to-END', function () {

    let userRepositorySupabase: IUserRepository;

    beforeEach(() => { userRepositorySupabase = new UserRepositorySupabase() })

    test('Deve fazer login com sucesso', async function () {
        const register = new LoginUser(userRepositorySupabase);
        const user: TLoginUserInputDTO = { email: 'admin@gmail.com', password: '123456' }

        const response = await register.execute(user.email, user.password)
        console.debug('Login: ', response)
        expect(response).toEqual(expect.objectContaining({
            token: expect.any(String),
            type_token: expect.any(String)
        }))
    })


    test('Deve criar um usuário com sucesso', async function () {
        const register = new RegisterUser(userRepositorySupabase)

        const response = await register.execute({
            email: faker.internet.email(),
            username: `${faker.person.firstName()} ${faker.person.lastName()}`,
            password: '123456'
        })
        console.log("User criado: ", response)
        expect(response).toHaveProperty('id')

    })
    test('Deve encontrar um usuário por email', async function () {
        const response = await userRepositorySupabase.findByEmail('znt000@gmail.com')
        console.debug('User encontrado: ', response)
        expect(response).not.toBe(null)
    })
});