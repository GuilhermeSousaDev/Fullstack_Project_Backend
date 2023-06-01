import AppError from "@shared/infra/errors/AppError";
import { FakeUserRepository } from "../../domain/repositories/Fakes/FakeUserRepository";
import CreateUserService from "../CreateUserService";
import FakeBcryptProvider from "@shared/infra/container/providers/Bcrypt/Fakes/FakeBcryptProvider";

let fakeUserRepository: FakeUserRepository;
let createUser: CreateUserService;
let fakeBcryptProvider: FakeBcryptProvider;

describe('Create Users', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeBcryptProvider = new FakeBcryptProvider();
        createUser = new CreateUserService(fakeUserRepository, fakeBcryptProvider);
;
    });

    it('should be create a new user', async () => {
        const user = await createUser.execute({
            name: 'Diego',
            email: 'diego@gmail.com',
            password: '12345'
        });

        expect(user).toHaveProperty('id');
    });

    it('should be throw a error user already exists', async () => {
        await createUser.execute({
            name: 'Diego',
            email: 'diego@gmail.com',
            password: '12345'
        });

        expect(
            createUser.execute({
                name: 'Diego',
                email: 'diego@gmail.com',
                password: '12345'
            }),
        ).rejects.toBeInstanceOf(AppError)
    });
})