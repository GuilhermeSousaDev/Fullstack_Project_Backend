import { IComment } from "../models/IComment";
import { ICreateComment } from "../models/ICreateComment";

export interface ICommentRepository {
    save(comment: IComment): Promise<IComment>;
    create(data: ICreateComment): Promise<IComment>;
    remove(comment: IComment): Promise<void>;
    findById(id: number): Promise<IComment>;
    findNewsComments(newsId: number): Promise<IComment[]>;
}