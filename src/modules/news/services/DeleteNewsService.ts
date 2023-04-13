import { inject, injectable } from "tsyringe";
import { IRedisCache } from "../../../shared/infra/container/providers/CacheProvider/models/IRedisCache";
import AppError from "../../../shared/infra/errors/AppError";
import { INewsRepository } from "../domain/repositories/INewsRepository";
import { ILikesRepository } from "../domain/repositories/ILikesRepository";

@injectable()
export default class DeleteNewsService {
    constructor(
        @inject('newsRepository')
        private newsRepository: INewsRepository, 
        @inject('likesRepository')
        private likesRepository: ILikesRepository, 
        @inject('cacheProvider')
        private chacheProvider: IRedisCache,
    ) {}

    public async execute(id: number): Promise<void> {
        const news = await this.newsRepository.findById(id);

        if (!news) {
            throw new AppError('News not Found');
        }

        await this.newsRepository.delete(news);

        await this.chacheProvider.invalidate('api-news-NEWS_LIST');
    }
}