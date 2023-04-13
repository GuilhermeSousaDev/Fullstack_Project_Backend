import { getRepository, Repository } from "typeorm";
import { INews } from "../../../../news/domain/models/INews";
import { IUser } from "../../../../users/domain/models/IUser";
import { ICreateFavorites } from "../../../domain/models/ICreateFavorites";
import { IFavorites } from "../../../domain/models/IFavorites";
import { IFavoritesRepository } from "../../../domain/repositories/IFavoritesRepository";
import { Favorites } from "../entities/Favorites";

export default class FavoriteRepository implements IFavoritesRepository {
    ormRepository: Repository<Favorites>;

    constructor() {
        this.ormRepository = getRepository(Favorites);
    }

    public async save(favorite: IFavorites): Promise<IFavorites> {
        return this.ormRepository.save(favorite);
    }

    public async create(data: ICreateFavorites): Promise<IFavorites> {
        return this.ormRepository.create(data);
    }

    public async remove(favorite: IFavorites): Promise<void> {
        this.ormRepository.remove(favorite);
    }

    public async findById(id: number): Promise<IFavorites> {
        return this.ormRepository.findOne(id, {
            relations: ['user', 'news'],
        });
    }

    public async findByUserId(userId: number): Promise<IFavorites[]> {
        return this.ormRepository.find({
            where: {
                user: {
                    id: userId,
                },
            },
            relations: ['user', 'news'],
        });
    }

    public async findFavorite(userId: number | IUser, newsId: number | INews): Promise<IFavorites> {
        return this.ormRepository.findOne({
            where: {
                user: {
                    id: userId,
                },
                news: {
                    id: newsId,
                },
            },
        });
    }
}