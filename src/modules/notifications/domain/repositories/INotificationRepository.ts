import { ICreateNotification } from "../models/ICreateNotification";
import { INotification } from "../models/INotification";

export interface INotificationRepository {
    save(notification: INotification): Promise<INotification>;
    create(data: ICreateNotification): Promise<INotification>;
    createAndSave(data: ICreateNotification): Promise<INotification>;
    find(userId: number): Promise<INotification[]>;
    findById(id: number): Promise<INotification>;
    remove(notification: INotification): Promise<void>;
}