import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import isAuthenticated from "../../../../../shared/infra/http/middlewares/isAuthenticated";
import FriendsController from "../controllers/FriendsController";

const friendsRouter = Router();
friendsRouter.use(isAuthenticated);

const friendsController = new FriendsController();

friendsRouter.get(
    '/',
    friendsController.index,
);

friendsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            friendId: Joi.number().required(),
        },
    }),
    friendsController.create,
);

friendsRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            friendId: Joi.number().required(),
        },
    }),
    friendsController.update,    
);

friendsRouter.delete(
    '/',
    celebrate({
        [Segments.BODY]: {
            friendId: Joi.number().required(),
        },
    }),
    friendsController.delete,    
);

export default friendsRouter;