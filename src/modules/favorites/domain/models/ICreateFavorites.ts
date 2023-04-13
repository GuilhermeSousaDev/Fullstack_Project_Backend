import { INews } from "../../../news/domain/models/INews";
import { IUser } from "../../../users/domain/models/IUser";

export interface ICreateFavorites {
    news: INews;
    user: IUser;
}