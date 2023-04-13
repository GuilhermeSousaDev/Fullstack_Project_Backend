import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/infra/errors/AppError";
import { ILikesRepository } from "../domain/repositories/ILikesRepository";

@injectable()
export default class DeleteLikeService {
    constructor(
        @inject('likesRepository')
        private likesRepository: ILikesRepository,
    ) {}

    public async execute(id: number): Promise<void> {
        const like = await this.likesRepository.findById(id);

        if (!like) {
            throw new AppError('Like not found');
        }

        await this.likesRepository.delete(like);
    }
}