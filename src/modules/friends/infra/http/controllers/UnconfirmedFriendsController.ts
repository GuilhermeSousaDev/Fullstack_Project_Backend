import { Request, Response } from "express";
import { container } from "tsyringe";
import ListUnconfirmedFriendsService from "../../../services/ListUnconfirmedFriendsService";

export default class UnconfirmedFriendsController {
    public async index(req: Request, res: Response): Promise<Response> {
        const userId = req.user.id;
        
        const unconfirmedFriends = container.resolve(ListUnconfirmedFriendsService);

        const requests = await unconfirmedFriends.execute(userId);

        return res.json(requests);
    }
}