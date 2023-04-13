import { inject, injectable } from "tsyringe";
import { IComment } from "../domain/models/IComment";
import { ICreateComment } from "../domain/models/ICreateComment";
import { ICommentRepository } from "../domain/repositories/ICommentRepository";

@injectable()
export default class CreateCommentService {
    constructor(
        @inject('commentRepository')
        private commentRepository: ICommentRepository,
    ) {}

    public async execute({ comment, user, news }: ICreateComment): Promise<IComment> {
        const newComment = await this.commentRepository.create({
            comment,
            user,
            news,
        });

        await this.commentRepository.save(newComment);

        return newComment;
    }
}