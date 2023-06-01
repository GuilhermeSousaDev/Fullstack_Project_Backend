import { FakeUserRepository } from "@modules/users/domain/repositories/Fakes/FakeUserRepository";
import DeleteUserService from "../DeleteUserService";
import ListUsersService from "../ListUsersService";
import AppError from "@shared/infra/errors/AppError";

describe('Delete User', () => {
    it('should be delete user and return a empty array', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const listUsers = new ListUsersService(fakeUserRepository);
        const deleteUser = new DeleteUserService(fakeUserRepository);

        await deleteUser.execute('1');

        const users = await listUsers.execute();

        expect(users).toEqual([]);
    });

    it('should be find a inexistent user and return a error', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const deleteUser = new DeleteUserService(fakeUserRepository);

        expect(deleteUser.execute('2')).rejects.toBeInstanceOf(AppError);
    });
})