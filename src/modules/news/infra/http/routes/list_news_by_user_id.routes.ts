import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import ListNewsByUserIdController from "../controllers/ListNewsByUserIdController";

const listNewsByUserIdRouter = Router();
const listNewsByUserIdController = new ListNewsByUserIdController();

listNewsByUserIdRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required(),
        },
    }),   
    listNewsByUserIdController.index,      
);

export default listNewsByUserIdRouter;