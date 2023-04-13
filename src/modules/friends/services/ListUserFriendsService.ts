import { inject, injectable } from "tsyringe";
import { IFriends } from "../domain/models/IFriends";
import { IFriendsRepository } from "../domain/repositories/IFriendsRepository";

@injectable()
export default class ListUserFriendsService {
    constructor(
        @inject('friendsRepository')
        private friendsRepository: IFriendsRepository,
    ) {}

    public async execute(userId: number): Promise<IFriends[]> {
        const friends = await this.friendsRepository.findUserFriends(userId);

        return friends;
    }
}