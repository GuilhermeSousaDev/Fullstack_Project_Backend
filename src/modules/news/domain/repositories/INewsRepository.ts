import { ICreateNews } from "../models/ICreateNews";
import { INews } from "../models/INews";

export interface INewsRepository {
    save(news: INews): Promise<INews>;
    create(data: ICreateNews): Promise<INews>;
    delete(news: INews): Promise<void>;
    find(): Promise<INews[]>;
    findById(id: number): Promise<INews>;
    findNewsByUserId(userId: number): Promise<INews[]>;
}
