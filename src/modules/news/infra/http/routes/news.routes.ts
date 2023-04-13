import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { uploadConfig } from "../../../../../config/upload";
import isAuthenticated from "../../../../../shared/infra/http/middlewares/isAuthenticated";
import NewsController from "../controllers/NewsController";
import multer from 'multer';

const newsRouter = Router();
const newsController = new NewsController();
const upload = multer(uploadConfig.multer);

newsRouter.get('/', newsController.index);
newsRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required(),
        },
    }),
    newsController.show,
);
newsRouter.post(
    '/',
    isAuthenticated,
    upload.single('file'),
    celebrate({
        [Segments.BODY]: {
            title: Joi.string().required(),
            content: Joi.string().required(),
            description: Joi.string().required(),
            user: Joi.number().required(),
            username: Joi.string().required(),
        },
    }),
    newsController.create,
);
newsRouter.delete(
    '/:id',
    isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required(),
        },
    }),
    newsController.delete,
);

export default newsRouter;
