import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/infra/errors/AppError";
import { IFriendsRepository } from "../domain/repositories/IFriendsRepository";

@injectable()
export default class DeleteFriendshipService {
    constructor(
        @inject('friendsRepository')
        private friendsRepository: IFriendsRepository,
    ) {}

    public async execute(userId: number, friendId: number): Promise<void> {
        const friends = await this.friendsRepository.findFriendOrRequestedFriend(userId, friendId);

        if (!friends) {
            throw new AppError('This friendship not exists');
        }

        await this.friendsRepository.remove(friends);
    }
}