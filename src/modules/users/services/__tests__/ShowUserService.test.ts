import { FakeUserRepository } from "@modules/users/domain/repositories/Fakes/FakeUserRepository";
import ShowUserService from "../ShowUserService";
import AppError from "@shared/infra/errors/AppError";

describe('Show User', () => {
    it('should be return a user with your id', async () => {
        const fakeUserRepository = new FakeUserRepository();

        const showUser = new ShowUserService(fakeUserRepository);

        const user = await showUser.execute('1');

        expect(user.name).toEqual('Guilherme');
    });

    it('should be return a error why user does not exists', async () => {
        const fakeUserRepository = new FakeUserRepository();

        const showUser = new ShowUserService(fakeUserRepository);

        expect(showUser.execute('2')).rejects.toBeInstanceOf(AppError);
    });
})