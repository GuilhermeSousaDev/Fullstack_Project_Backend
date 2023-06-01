import { INews } from "../../models/INews";
import { INewsRepository } from "../INewsRepository";

export default class FakeNewsRepository implements INewsRepository {
    news: INews[] = [];

    public async save(news: INews): Promise<INews> {
        
    }
}