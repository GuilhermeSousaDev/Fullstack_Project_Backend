import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateNewsService from "../../../services/CreateNewsService";
import DeleteNewsService from "../../../services/DeleteNewsService";
import ListNewsService from "../../../services/ListNewsService";
import ShowNewsService from "../../../services/ShowNewsService";

export default class NewsController {
    public async index(req: Request, res: Response): Promise<Response> {
        const listNewsService = container.resolve(ListNewsService);

        const news = await listNewsService.execute();

        return res.json(news);
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const showNewsService = container.resolve(ShowNewsService);

        const news = await showNewsService.execute(id);

        return res.json(news);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { title, content, description, user, username } = req.body;
        const { path, filename } = req.file;

        const createNewsService = container.resolve(CreateNewsService);

        const news = await createNewsService.execute({
            title,
            content,
            description,
            user,
            username,
            file: {
                name: filename, 
                path,
            },
        });

        return res.json(news);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const deleteNewsService = container.resolve(DeleteNewsService);

        await deleteNewsService.execute(Number(id));

        return res.json([]);
    }
}
