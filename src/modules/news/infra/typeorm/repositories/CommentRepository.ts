import { getRepository, Repository } from "typeorm";
import { IComment } from "../../../domain/models/IComment";
import { ICreateComment } from "../../../domain/models/ICreateComment";
import { ICommentRepository } from "../../../domain/repositories/ICommentRepository";
import { Comment } from "../entites/Comment";

export default class CommentRepository implements ICommentRepository {
    ormRepository: Repository<Comment>;

    constructor() {
        this.ormRepository = getRepository(Comment);
    }

    public async save(comment: IComment): Promise<IComment> {
        return this.ormRepository.save(comment);
    }

    public async create(data: ICreateComment): Promise<IComment> {
        return this.ormRepository.create(data);
    }

    public async remove(comment: IComment): Promise<void> {
        this.ormRepository.remove(comment);
    }

    public async findById(id: number): Promise<IComment> {
        return this.ormRepository.findOne(id);
    }

    public async findNewsComments(newsId: number): Promise<IComment[]> {
        return this.ormRepository.find({
            where: {
                news: {
                    id: newsId,
                },
            },
            relations: ['news', 'user'],
        });
    }
}