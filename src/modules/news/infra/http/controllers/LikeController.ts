import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateLikeService from "../../../services/CreateLikeService";
import DeleteLikeService from "../../../services/DeleteLikeService";
import ShowLikeService from "../../../services/ShowLikeService";

export default class LikeController {
    public async index(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const showLike = container.resolve(ShowLikeService);

        const like = await showLike.execute(Number(id));

        return res.json(like);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { news, user } = req.body;

        const createLikeService = container.resolve(CreateLikeService);

        const like = await createLikeService.execute({ 
            news, 
            user,
        });

        return res.json(like);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id }  = req.params;

        const deleteLikeService = container.resolve(DeleteLikeService);

        await deleteLikeService.execute(Number(id));

        return res.json([]);
    }
}