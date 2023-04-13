import { IFavorites } from "../../../favorites/domain/models/IFavorites";
import { IUser } from "../../../users/domain/models/IUser";
import { IComment } from "./IComment";
import { ILikes } from "./ILikes";

export interface INews {
    id: number;
    title: string;
    description: string;
    content: string;
    image: string;
    likes: ILikes[];
    comment: IComment[];
    favorites: IFavorites[];
    user: IUser;
    createdAt: Date;
    updatedAt: Date;
}
