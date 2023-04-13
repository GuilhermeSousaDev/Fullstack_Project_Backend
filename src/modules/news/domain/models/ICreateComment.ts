import { IUser } from "../../../users/domain/models/IUser";
import { INews } from "./INews";

export interface ICreateComment {
    comment: string;
    news: INews;
    user: IUser;
}