import { Equal, getRepository, In, Repository } from "typeorm";
import { ICreateNotification } from "../../../domain/models/ICreateNotification";
import { INotification } from "../../../domain/models/INotification";
import { INotificationRepository } from "../../../domain/repositories/INotificationRepository";
import { Notification } from "../entities/Notification";

export default class NotificationRepository implements INotificationRepository {
    ormRepository: Repository<Notification>;

    constructor() {
        this.ormRepository = getRepository(Notification);
    }

    public async save(notification: INotification): Promise<INotification> {
        return this.ormRepository.save(notification);
    }

    public async create(data: ICreateNotification): Promise<INotification> {
        return this.ormRepository.create(data);
    }

    public async createAndSave(data: ICreateNotification): Promise<INotification> {
        const notification = this.ormRepository.create(data);

        return this.ormRepository.save(notification);
    }

    public async find(userId: number): Promise<INotification[]> {
        return this.ormRepository.find({
            where: {
                receiveUserId: userId,
            },
            select: ['id', 'type', 'message', 'linkId'],
        });
    }

    public async findById(id: number): Promise<INotification> {
        return this.ormRepository.findOne(id);
    }

    public async remove(notification: INotification): Promise<void> {
        this.ormRepository.remove(notification);
    }
}
