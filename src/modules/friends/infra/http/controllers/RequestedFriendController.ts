import { Request, Response } from "express";
import { container } from "tsyringe";
import ListRequestedFriendService from "../../../services/ListRequestedFriendService";

export default class RequestedFriendController {
    public async index(req: Request, res: Response): Promise<Response> {
        const userId = req.user.id;

        const requestedFriend = container.resolve(ListRequestedFriendService);

        const requests = await requestedFriend.execute(userId);

        return res.json(requests);
    }
}