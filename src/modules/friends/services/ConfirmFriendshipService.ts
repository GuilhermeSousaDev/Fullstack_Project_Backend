import { injectable, inject } from "tsyringe";
import AppError from "../../../shared/infra/errors/AppError";
import { INotificationRepository } from "../../notifications/domain/repositories/INotificationRepository";
import { IConfirmfriendship } from "../domain/models/IConfirmFriendship";
import { IFriends } from "../domain/models/IFriends";
import { IFriendsRepository } from "../domain/repositories/IFriendsRepository";

@injectable()
export default class ConfirmFriendshipService {
    constructor(
        @inject('friendsRepository')
        private friendsRepository: IFriendsRepository,
        @inject('notificationRepository')
        private notificationRepository: INotificationRepository,
    ) {}

    public async execute({ user, friendId, friendConfirmed }: IConfirmfriendship): Promise<IFriends> {
        const friendshipExists = await this.friendsRepository.findFriendOrRequestedFriend(friendId, user.id);

        if (!friendshipExists) {
            throw new AppError('This friendship not exists');
        }

        if (friendshipExists.friendConfirmed) {
            throw new AppError('This friendship already confirmed');
        }

        const friends = await this.friendsRepository.save({
            ...friendshipExists,
            friendConfirmed,
        });

        await this.notificationRepository.createAndSave({
            type: 'friend',
            message: `${user.name} accepted you friend request`,
            linkId: user.id,
            receiveUserId: friendId,
        });

        return friends;
    }
}