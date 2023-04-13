import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/infra/errors/AppError";
import { INews } from "../domain/models/INews";
import { INewsRepository } from "../domain/repositories/INewsRepository";

@injectable()
export default class ShowNewsService {
    constructor(
        @inject('newsRepository')
        private newsRepository: INewsRepository, 
    ) {}

    public async execute(id: string): Promise<INews> {
        const news = await this.newsRepository.findById(Number(id));

        if (!news) {
            throw new AppError('News not Found');
        }

        return news;
    }
}