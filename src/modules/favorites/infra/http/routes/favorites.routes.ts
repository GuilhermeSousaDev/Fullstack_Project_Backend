import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import isAuthenticated from "../../../../../shared/infra/http/middlewares/isAuthenticated";
import FavoritesController from "../controllers/FavoritesController";

const favoritesRouter = Router();
const favoritesController = new FavoritesController();

favoritesRouter.get(
    '/',
    isAuthenticated,
    favoritesController.index,
);

favoritesRouter.get(
    '/:id',
    isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        },
    }),
    favoritesController.show,
);

favoritesRouter.post(
    '/',
    isAuthenticated,
    celebrate({
        [Segments.BODY]: {
            news: Joi.number().required(),
            user: Joi.number().required(),
        },
    }),
    favoritesController.create,
);

favoritesRouter.delete(
    '/:id',
    isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        },
    }),
    favoritesController.remove,
);

export default favoritesRouter;