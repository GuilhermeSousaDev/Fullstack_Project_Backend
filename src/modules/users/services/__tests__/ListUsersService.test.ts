import { FakeUserRepository } from "../../domain/repositories/Fakes/FakeUserRepository";
import ListUsersService from "../ListUsersService";

describe('List Users', () => {
    it('should be return all users in database', async () => {
        const fakeUserRepository = new FakeUserRepository();
        
        const listUsers = new ListUsersService(fakeUserRepository);

        const users = await listUsers.execute();

        expect(users).toBeDefined();
    });
})