import { Router } from "express";
import isAuthenticated from "../../../../../shared/infra/http/middlewares/isAuthenticated";
import UnconfirmedFriendsController from "../controllers/UnconfirmedFriendsController";

const unconfirmedFriendsRouter = Router();
unconfirmedFriendsRouter.use(isAuthenticated);

const unconfirmedFriendsController = new UnconfirmedFriendsController();

unconfirmedFriendsRouter.get('/', unconfirmedFriendsController.index);

export default unconfirmedFriendsRouter;