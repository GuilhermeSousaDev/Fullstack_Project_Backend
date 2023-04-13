import { INews } from "../../../news/domain/models/INews";
import { IUser } from "../../../users/domain/models/IUser";

export interface IFavorites {
    id: number;
    news: INews;
    user: IUser;
    createdAt: Date;
    updatedAt: Date;
}