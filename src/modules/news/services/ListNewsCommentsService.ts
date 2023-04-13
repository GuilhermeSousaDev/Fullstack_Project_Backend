import { inject, injectable } from "tsyringe";
import { IComment } from "../domain/models/IComment";
import { ICommentRepository } from "../domain/repositories/ICommentRepository";

@injectable()
export default class ListNewsCommentsService {
    constructor(
        @inject('commentRepository')
        private commentRepository: ICommentRepository,
    ) {}

    public async execute(newsId: number): Promise<IComment[]> {
        const comments = await this.commentRepository.findNewsComments(newsId);

        return comments;
    }
}