import { IUser } from "../../../users/domain/models/IUser";
import { INews } from "./INews";

export interface IComment {
    id: number;
    comment: string;
    news: INews;
    user: IUser;
    createdAt: Date;
    updatedAt: Date;
}