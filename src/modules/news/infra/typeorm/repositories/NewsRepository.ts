import { getRepository, In, Repository } from "typeorm";
import { IAddLike } from "../../../domain/models/IAddLike";
import { ICreateNews } from "../../../domain/models/ICreateNews";
import { INews } from "../../../domain/models/INews";
import { INewsRepository } from "../../../domain/repositories/INewsRepository";
import { News } from "../entites/News";

export default class NewsRepository implements INewsRepository {
    ormRepository: Repository<News>;

    constructor() {
        this.ormRepository = getRepository(News);
    }

    public async save(news: INews): Promise<INews> {
        return this.ormRepository.save(news);
    }

    public async create({ title, content, description, user }: ICreateNews): Promise<INews> {
        return this.ormRepository.create({
            title,
            content,
            description,
            user,
        });
    }

    public async delete(news: INews): Promise<void> {
        this.ormRepository.delete(news);
    }

    public async find(): Promise<INews[]> {
        return this.ormRepository.find({
            relations: ['user'],
        });
    }

    public async findById(id: number): Promise<INews> {
        return this.ormRepository.findOne(id, {
          relations: ['user', 'likes'],
        });
    }

    public async findNewsByUserId(userId: number): Promise<INews[]> {
        return this.ormRepository.find({
            where: {
                user: {
                    id: userId,
                },
            },
            relations: ['user'],
            select: [
                'id',
                'title',
                'content',
                'description',
                'user',
                'image',
            ],
        });
    }
}
