import { injectable, inject } from "tsyringe";
import AppError from "../../../shared/infra/errors/AppError";
import { INotificationRepository } from "../../notifications/domain/repositories/INotificationRepository";
import { ICreateFriends } from "../domain/models/ICreateFriends";
import { IFriends } from "../domain/models/IFriends";
import { IFriendsRepository } from "../domain/repositories/IFriendsRepository";

@injectable()
export default class SendFriendRequestService {
    constructor(
        @inject('friendsRepository')
        private friendsRepository: IFriendsRepository,
        @inject('notificationRepository')
        private notificationRepository: INotificationRepository,
    ) {}

    public async execute({ user, friendId }: ICreateFriends): Promise<IFriends> {
        if (user.id === friendId) {
            throw new AppError('This is not possible');
        }

        const friendshipExists = await this.friendsRepository
        .findFriendOrRequestedFriend(user.id, friendId);

        if (friendshipExists && !friendshipExists.friendConfirmed && friendshipExists.friendId === user.id) {
            const friendship = await this.friendsRepository.save({
                ...friendshipExists,
                friendConfirmed: true,
            });

            await this.notificationRepository.createAndSave({
                type: 'friend',
                message: `${user.name} sent a friend request`,
                linkId: friendId,
                receiveUserId: user.id,
            });

            return friendship;
        }

        if (friendshipExists) {
            throw new AppError('This friendship already exists');
        }

        const friends = await this.friendsRepository.create({
            user,
            friendId,
        });

        await this.friendsRepository.save(friends);

        await this.notificationRepository.createAndSave({
            type: 'friend',
            message: `${user.name} sent a friend request`,
            linkId: user.id,
            receiveUserId: friendId,
        });

        return friends;
    }
}