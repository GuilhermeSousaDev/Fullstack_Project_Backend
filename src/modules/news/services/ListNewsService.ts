import { inject, injectable } from "tsyringe";
import { IRedisCache } from "../../../shared/infra/container/providers/CacheProvider/models/IRedisCache";
import { INews } from "../domain/models/INews";
import { INewsRepository } from "../domain/repositories/INewsRepository";

@injectable()
export default class ListNewsService {
    constructor(
        @inject('newsRepository')
        private newsRepository: INewsRepository, 
        @inject('cacheProvider')
        private cacheProvider: IRedisCache,
    ) {}

    public async execute(): Promise<INews[]> {
        let news = await this.cacheProvider.recover<INews[]>('api-news-NEWS_LIST');

        if (!news) {
            news = await this.newsRepository.find();
        }

        await this.cacheProvider.save('api-news-NEWS_LIST', news);

        return news;
    }
}