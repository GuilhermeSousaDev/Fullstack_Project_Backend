import { FakeUserRepository } from "@modules/users/domain/repositories/Fakes/FakeUserRepository";
import CreateSessionService from "../CreateSessionService";
import FakeBcryptProvider from "@shared/infra/container/providers/Bcrypt/Fakes/FakeBcryptProvider";
import JwtProvider from "@shared/infra/container/providers/Jwt/implementations/JwtProvider";
import AppError from "@shared/infra/errors/AppError";

let fakeUserRepository: FakeUserRepository;
let fakeBcryptProvider: FakeBcryptProvider;
let createSessionService: CreateSessionService;
let jwtProvider: JwtProvider;

describe('Create Session', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeBcryptProvider = new FakeBcryptProvider();
        jwtProvider = new JwtProvider();
        createSessionService = new CreateSessionService(
            fakeUserRepository,
            fakeBcryptProvider,
            jwtProvider,
        );
    });

    it('should be return a token when user logs in', async () => {
        const session = await createSessionService.execute({
            email: 'gui@gmail.com',
            password: '12345',
        });

        expect(session).toHaveProperty('token');
    });

    it('should be return a error when a wrong email is passed', async () => {
        expect(
            createSessionService.execute({
                email: 'gu@gmail.com',
                password: '12345',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be return a error when a wrong password is passed', async () => {
        expect(
            createSessionService.execute({
                email: 'gui@gmail.com',
                password: 'wrongpassword',
            })
        ).rejects.toBeInstanceOf(AppError);
    });
})