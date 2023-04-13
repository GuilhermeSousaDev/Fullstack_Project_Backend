import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateNotificationService from "../../../services/CreateNotificationService";
import DeleteNotificationService from "../../../services/DeleteNotificationService";
import ListNotificationsService from "../../../services/ListNotificationsService";

export default class NotificationController {
    public async index(req: Request, res: Response): Promise<Response> {
        const userId = req.user.id;

        const listNotifications = container.resolve(ListNotificationsService);

        const notifications = await listNotifications.execute(userId);

        return res.json(notifications);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { type, linkId, receiveUserId } = req.body;

        const createNotification = container.resolve(CreateNotificationService);

        const notification = await createNotification.execute({
            type,
            linkId,
            receiveUserId,
        })

        return res.json(notification);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const deleteNotification = container.resolve(DeleteNotificationService);

        await deleteNotification.execute(Number(id));

        return res.json([]);
    }
}