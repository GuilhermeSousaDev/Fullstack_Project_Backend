import { Router } from "express";
import isAuthenticated from "../../../../../shared/infra/http/middlewares/isAuthenticated";
import RequestedFriendController from "../controllers/RequestedFriendController";

const requestedFriendsRouter = Router();
requestedFriendsRouter.use(isAuthenticated);

const requestedFriendsController = new RequestedFriendController();

requestedFriendsRouter.get('/', requestedFriendsController.index);

export default requestedFriendsRouter;