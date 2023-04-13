import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateFavoritesService from "../../../services/CreateFavoritesService";
import DeleteFavoritesService from "../../../services/DeleteFavoritesService";
import ListFavoritesService from "../../../services/ListFavoritesService";
import ShowFavoriteService from "../../../services/ShowFavoriteService";

export default class FavoritesController {
    public async index(req: Request, res: Response): Promise<Response> {
        const userId = req.user.id;

        const listFavoritesService = container.resolve(ListFavoritesService);

        const favorites = await listFavoritesService.execute(userId);

        return res.json(favorites);
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        
        const showFavoriteService = container.resolve(ShowFavoriteService);

        const favorites = await showFavoriteService.execute(Number(id));

        return res.json(favorites);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { news, user } = req.body;

        const createFavoritesService = container.resolve(CreateFavoritesService);

        const favorites = await createFavoritesService.execute({
            news,
            user,
        });

        return res.json(favorites);
    }

    public async remove(req: Request, res: Response): Promise<Response> {
        const { id } = req.body;
        
        const deleteFavoritesService = container.resolve(DeleteFavoritesService);

        await deleteFavoritesService.execute(id);

        return res.json([]);
    }
}