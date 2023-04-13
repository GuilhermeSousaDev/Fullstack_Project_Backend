import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/infra/errors/AppError";
import { IAddLike } from "../domain/models/IAddLike";
import { ILikes } from "../domain/models/ILikes";
import { ILikesRepository } from "../domain/repositories/ILikesRepository";

@injectable()
export default class CreateLikeService {
    constructor(
        @inject('likesRepository')
        private likesRepository: ILikesRepository,
    ) {}

    public async execute({ user, news }: IAddLike): Promise<ILikes> {
        const likeExists = await this.likesRepository
            .findIfLikeExists(user, news);

        if (likeExists) {
            throw new AppError('This like already exists');
        }

        const like = await this.likesRepository.create({
            user,
            news,
        });

        await this.likesRepository.save(like);

        return like;
    }
}
