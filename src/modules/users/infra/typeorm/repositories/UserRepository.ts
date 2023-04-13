import { getRepository, Repository } from 'typeorm';
import { ICreateUser } from '../../../domain/models/ICreateUser';
import { IUser } from "../../../domain/models/IUser";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from '../entities/User';

export default class UserRepository implements IUserRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async save(user: IUser): Promise<IUser> {
        return await this.ormRepository.save(user);
    }

    public async create(data: ICreateUser): Promise<IUser> {
        return this.ormRepository.create(data);
    }

    public async delete(user: IUser): Promise<void> {
        this.ormRepository.remove(user);
    }

    public async find(): Promise<IUser[]> {
        return this.ormRepository.find({ 
            select: ['id', 'name', 'email', 'createdAt'],
        });
    }

    public async findById(id: number): Promise<IUser> {
        return this.ormRepository.findOne(id, {
            select: ['id', 'name', 'email', 'createdAt', 'news'],
            relations: ['news'],
        });
    }

    public async findByEmail(email: string): Promise<IUser> {
        return this.ormRepository.findOne({ where: { email } });
    }
}