import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import CommentController from "../controllers/CommentController";

const commentRouter = Router();
const commentController = new CommentController();

commentRouter.get(
    '/:newsId',
    celebrate({
        [Segments.PARAMS]: {
            newsId: Joi.number().required(),
        },
    }),
    commentController.index,
);
commentRouter.post(
    '/',
    celebrate({ 
        [Segments.BODY]: {
            comment: Joi.string().required(),
            user: Joi.number().required(),
            news: Joi.number().required(),
        },
    }),
    commentController.create,
);
commentRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        },
    }),
    commentController.delete,
);

export default commentRouter;