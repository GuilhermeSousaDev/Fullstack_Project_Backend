import { inject, injectable } from "tsyringe";
import { IRedisCache } from "../../../shared/infra/container/providers/CacheProvider/models/IRedisCache";
import { IDateFns } from "../../../shared/infra/container/providers/DateFns/models/IDateFns";
import { INotification } from "../domain/models/INotification";
import { INotificationRepository } from "../domain/repositories/INotificationRepository";

@injectable()
export default class ListNotificationsService {
    constructor(
        @inject('notificationRepository')
        private notificationRepository: INotificationRepository,
        @inject('cacheProvider')
        private cacheProvider: IRedisCache,
        @inject('datefnsProvider')
        private datefnsProvider: IDateFns,
    ) {}

    public async execute(userId: number): Promise<INotification[] & { notificationsLength: number }> {
        let notifications = await this.cacheProvider
            .recover<INotification[]>(`api-news-NOTIFICATION_LIST_${userId}`);

        if (!notifications) {
            notifications = await this.notificationRepository.find(userId);

            await this.cacheProvider.save(`api-news-NOTIFICATION_LIST_${userId}`, notifications);
        }

        let promises = [];

        const notificationsLength = notifications.length;

        notifications.forEach(notification => {
            const oldDate = this.datefnsProvider.isAfterAtCurrentDate(notification.deleteTime);

            if (oldDate) {
                promises.push(
                    this.notificationRepository.remove(notification),
                    this.cacheProvider.invalidate(`api-news-NOTIFICATION_LIST_${userId}`),
                );
            }
        });

        await Promise.all(promises);

        return {
          notifications,
          notificationsLength,
        };
    }
}
