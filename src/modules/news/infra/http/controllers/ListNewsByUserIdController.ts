import { Request, Response } from "express";
import { container } from "tsyringe";
import ListNewsByUserIdService from "../../../services/ListNewsByUserIdService";

export default class ListNewsByUserIdController {
    public async index(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        
        const listNewsByUserIdService = container.resolve(ListNewsByUserIdService);

        const news = listNewsByUserIdService.execute(id);

        return res.json(news);
    }
}