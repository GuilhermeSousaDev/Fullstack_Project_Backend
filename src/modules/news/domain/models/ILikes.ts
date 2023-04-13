import { IUser } from "../../../users/domain/models/IUser";
import { INews } from "./INews";

export interface ILikes {
  id: number;
  user: IUser;
  news: INews;
  createdAt: Date;
  updatedAt: Date;
}
