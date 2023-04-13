import { IUser } from "../../../users/domain/models/IUser";
import { INews } from "./INews";

export interface IAddLike {
    user: IUser;
    news: INews;
}