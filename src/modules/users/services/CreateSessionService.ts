import { inject, injectable } from "tsyringe";
import { IBcryptProvider } from "../../../shared/infra/container/providers/Bcrypt/models/IBcryptProvider";
import AppError from "../../../shared/infra/errors/AppError";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IJwtProvider } from "../../../shared/infra/container/providers/Jwt/models/IJwtProvider";
import { ISession } from "../domain/models/ISession";
import { ICreateSession } from "../domain/models/ICreateSession";

@injectable()
export default class CreateSessionService {
    constructor(
        @inject('userRepository')
        private userRepository: IUserRepository,
        @inject('bcryptProvider')
        private bcryptProvider: IBcryptProvider,
        @inject('jwtProvider')
        private jwtProvider: IJwtProvider,
    ) {}

    public async execute({ email, password }: ICreateSession): Promise<ISession> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('This User not exists');
        }

        const compareHash = await this.bcryptProvider.compareHash(password, user.password);

        if (!compareHash) {
            throw new AppError('Incorrect Password');
        }

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        const token = this.jwtProvider.generateToken(payload);

        return {
            user,
            token,
        };
    }
}