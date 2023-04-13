import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateCommentService from "../../../services/CreateCommentService";
import DeleteCommentService from "../../../services/DeleteCommentService";
import ListNewsCommentsService from "../../../services/ListNewsCommentsService";

export default class CommentController {
    public async index(req: Request, res: Response): Promise<Response> {
        const { newsId } = req.params;
        
        const listNewsComments = container.resolve(ListNewsCommentsService);

        const comments = await listNewsComments.execute(Number(newsId));

        return res.json(comments)
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { comment, user, news } = req.body;

        const createComment = container.resolve(CreateCommentService);

        const newComment = await createComment.execute({
            comment,
            user,
            news,
        });

        return res.json(newComment);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        
        const deleteCommentService = container.resolve(DeleteCommentService);

        await deleteCommentService.execute(Number(id));

        return res.json([]);
    }
}