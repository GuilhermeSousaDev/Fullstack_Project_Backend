import { getRepository, Repository } from "typeorm";
import { IAddLike } from "../../../domain/models/IAddLike";
import { ILikes } from "../../../domain/models/ILikes";
import { ILikesRepository } from "../../../domain/repositories/ILikesRepository";
import { Likes } from "../entites/Likes";

export default class LikesRepository implements ILikesRepository {
    ormRepository: Repository<Likes>;

    constructor() {
        this.ormRepository = getRepository(Likes);
    }

    public async save(like: ILikes): Promise<ILikes> {
        return this.ormRepository.save(like);
    }

    public async findById(id: number): Promise<ILikes> {
        return this.ormRepository.findOne(id, { relations: ['user', 'news'] });    
    }

    public async create({ user, news }: IAddLike): Promise<ILikes> {
        return this.ormRepository.create({
            user,
            news,
        });
    }
    
    public async delete(like: ILikes): Promise<void> {
        this.ormRepository.remove(like);
    }

    public async findIfLikeExists(userId: number, newsId: number): Promise<ILikes> {
        return this.ormRepository.findOne({
            where: {
                user: {
                    id: userId,
                },
                news: {
                    id: newsId,
                },
            },
        });
    }

    public async findNewsLikes(newsId: number): Promise<ILikes[]> {
        return this.ormRepository.find({
            where: {
                news: {
                    id: newsId,
                },
            },
            relations: ['user'],
        })
    }
}