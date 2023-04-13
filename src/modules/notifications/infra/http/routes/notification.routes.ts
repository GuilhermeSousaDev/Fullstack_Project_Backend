import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import isAuthenticated from "../../../../../shared/infra/http/middlewares/isAuthenticated";
import NotificationController from "../controllers/NotificationController";

const notificationRouter = Router();
const notificationController = new NotificationController();

notificationRouter.get('/', isAuthenticated, notificationController.index);
notificationRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            type: Joi.string().required(),
            linkId: Joi.number().required(),
            receiveUserId: Joi.number().required(),
        },
    }),
    notificationController.create,
);
notificationRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required(),
        },
    }),
    notificationController.delete,
);

export default notificationRouter;