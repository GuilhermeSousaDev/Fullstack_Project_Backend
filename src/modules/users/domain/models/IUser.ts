import { IFavorites } from "../../../favorites/domain/models/IFavorites";
import { IComment } from "../../../news/domain/models/IComment";
import { ILikes } from "../../../news/domain/models/ILikes";
import { INews } from "../../../news/domain/models/INews";

export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    news: INews[];
    likes: ILikes[];
    comment: IComment[];
    favorites: IFavorites[];
    createdAt: Date;
    updatedAt: Date;
}