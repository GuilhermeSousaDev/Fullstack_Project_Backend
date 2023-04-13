import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";
import isAuthenticated from "../../../../../shared/infra/http/middlewares/isAuthenticated";
import LikeController from "../controllers/LikeController";

const likeRouter = Router();
const likeController = new LikeController();

likeRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        },
    }),
    likeController.index,
);

likeRouter.post(
    '/',
    isAuthenticated,
    celebrate({
        [Segments.BODY]: {
            user: Joi.number().required(),
            news: Joi.number().required(),
        },
    }),
    likeController.create,
);
likeRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        },
    }),
    likeController.delete,
);

export default likeRouter;
