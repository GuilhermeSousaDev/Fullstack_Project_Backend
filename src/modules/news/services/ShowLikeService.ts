import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/infra/errors/AppError";
import { ILikes } from "../domain/models/ILikes";
import { ILikesRepository } from "../domain/repositories/ILikesRepository";

@injectable()
export default class ShowLikeService {
    constructor(
        @inject('likesRepository')
        private likesRepository: ILikesRepository,
    ) {}

    public async execute(id: number): Promise<ILikes> {
        const like = await this.likesRepository.findById(id);

        if (!like) {
            throw new AppError('Like not found');
        }

        return like;
    }
}