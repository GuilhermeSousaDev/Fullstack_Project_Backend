import { INews } from "../../../news/domain/models/INews";
import { IUser } from "../../../users/domain/models/IUser";
import { ICreateFavorites } from "../models/ICreateFavorites";
import { IFavorites } from "../models/IFavorites";

export interface IFavoritesRepository {
    save(favorite: IFavorites): Promise<IFavorites>;
    create(data: ICreateFavorites): Promise<IFavorites>;
    remove(favorite: IFavorites): Promise<void>;
    findById(id: number): Promise<IFavorites>;
    findByUserId(userId: number): Promise<IFavorites[]>;
    findFavorite(userId: number | IUser, newsId: number | INews): Promise<IFavorites>;
}