import { Request, Response } from "express";
import { container } from "tsyringe";
import ConfirmFriendshipService from "../../../services/ConfirmFriendshipService";
import DeleteFriendshipService from "../../../services/DeleteFriendshipService";
import ListUserFriendsService from "../../../services/ListUserFriendsService";
import SendFriendRequestService from "../../../services/SendFriendRequestService";

export default class FriendsController {
    public async index(req: Request, res: Response): Promise<Response> {
        const userId = req.user.id;

        const listUserFriends = container.resolve(ListUserFriendsService);

        const friends = await listUserFriends.execute(userId);

        return res.json(friends);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { friendId } = req.body;
        const user = {
            id: req.user.id,
            name: req.user.name,
        };

        const sendFriendRequest = container.resolve(SendFriendRequestService);

        const friendRequest = await sendFriendRequest.execute({ friendId, user });

        return res.json(friendRequest);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { friendId } = req.body;

        const user = {
            id: req.user.id,
            name: req.user.name,
        }
        
        const confirmFriendship = container.resolve(ConfirmFriendshipService);

        const friends = await confirmFriendship.execute({
            user,
            friendId,
            friendConfirmed: true,
        });

        return res.json(friends);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { friendId } = req.body;
        const userId = req.user.id;

        const deleteFriendship = container.resolve(DeleteFriendshipService);

        await deleteFriendship.execute(userId, friendId);

        return res.json([]);
    }
}