import { inject, injectable } from "tsyringe";
import { INews } from "../domain/models/INews";
import { INewsRepository } from "../domain/repositories/INewsRepository";

@injectable()
export default class ListNewsByUserIdService {
    constructor(
        @inject('newsRepository')
        private newsRepository: INewsRepository, 
    ) {}

    public async execute(userId: string): Promise<INews[]> {
        const news = await this.newsRepository.findNewsByUserId(Number(userId));

        return news;
    }
}