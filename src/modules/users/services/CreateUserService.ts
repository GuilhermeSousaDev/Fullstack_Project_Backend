import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/infra/errors/AppError";
import { ICreateUser } from "../domain/models/ICreateUser";
import { IUser } from "../domain/models/IUser";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IBcryptProvider } from "../../../shared/infra/container/providers/Bcrypt/models/IBcryptProvider";

@injectable()
export default class CreateUserService {
    constructor(
        @inject('userRepository')
        private userRepository: IUserRepository,
        @inject('bcryptProvider')
        private bcryptProvider: IBcryptProvider,
    ) {}

    public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
        const userExists = await this.userRepository.findByEmail(email);

        if (userExists) {
            throw new AppError('This user already exists');
        }

        const user = await this.userRepository.create({ email, name, password });

        const hashedPassword = await this.bcryptProvider.generateHash(user.password);

        user.password = hashedPassword;

        await this.userRepository.save(user);

        return user;
    }
}