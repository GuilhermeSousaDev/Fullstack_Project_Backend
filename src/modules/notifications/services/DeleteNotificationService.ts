import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/infra/errors/AppError";
import { INotificationRepository } from "../domain/repositories/INotificationRepository";

@injectable()
export default class DeleteNotificationService {
    constructor(
        @inject('notificationRepository')
        private notificationRepository: INotificationRepository,
    ) {}

    public async execute(id: number): Promise<void> {
        const notification = await this.notificationRepository.findById(id);
        
        if (!notification) {
            throw new AppError('Notification not found');
        }

        await this.notificationRepository.remove(notification);
    }
}