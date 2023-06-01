import { User } from '../../../infra/typeorm/entities/User';
import { ICreateUser } from '../../models/ICreateUser';
import { IUser } from '../../models/IUser';
import { IUserRepository } from '../IUserRepository';

export class FakeUserRepository implements IUserRepository {
    protected users: IUser[] = [
        {
            id: 1,
            name: "Guilherme",
            email: "gui@gmail.com",
            password: "12345",
            comment: [],
            favorites: [],
            likes: [],
            news: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ];

    public async save(user: IUser): Promise<IUser> {
        const findIndex = this.users.findIndex(
            findUser => findUser.id === user.id
        );

        this.users[findIndex] = user;

        return user;
    }

    public async find(): Promise<IUser[]> {
        return this.users;
    }

    public async findById(id: number): Promise<IUser> {
        return this.users.find(user => user.id === id);
    }

    public async findByEmail(email: string): Promise<IUser> {
        return this.users.find(user => user.email === email);
    }

    public async create(data: ICreateUser): Promise<IUser> {
        const user = new User();

        user.id = this.users.length + 1;
        user.name = data.name;
        user.email = data.email;
        user.password = data.password;

        this.users.push(user);

        return user;
    }

    public async delete(user: IUser): Promise<void> {
        this.users = this.users.filter(({ id }) => id !== user.id);
    }
}