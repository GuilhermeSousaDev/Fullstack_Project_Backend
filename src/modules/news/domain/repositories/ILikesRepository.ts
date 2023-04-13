import { IAddLike } from "../models/IAddLike";
import { ILikes } from "../models/ILikes";
import { IUser } from '../../../users/domain/models/IUser';
import { INews } from '../models/INews';

export interface ILikesRepository {
    save(like: ILikes): Promise<ILikes>;
    create({ user, news }: IAddLike): Promise<ILikes>;
    delete(like: ILikes): Promise<void>;
    findById(id: number): Promise<ILikes>;
    findIfLikeExists(user: number | IUser, news: number | INews): Promise<ILikes>;
    findNewsLikes(newsId: number): Promise<ILikes[]>;
}
