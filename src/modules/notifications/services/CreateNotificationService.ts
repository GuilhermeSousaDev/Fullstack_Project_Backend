import { inject, injectable } from "tsyringe";
import { ICreateNotification } from "../domain/models/ICreateNotification";
import { INotification } from "../domain/models/INotification";
import { INotificationRepository } from "../domain/repositories/INotificationRepository";

@injectable()
export default class CreateNotificationService {
    constructor(
        @inject('notificationRepository')
        private notificationsRepository: INotificationRepository,
    ) {}

    public async execute(data: ICreateNotification): Promise<INotification> {
        const notification = await this.notificationsRepository.create(data);

        return notification;
    }
}