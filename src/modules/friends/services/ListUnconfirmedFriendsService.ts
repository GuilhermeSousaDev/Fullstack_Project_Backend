import { inject, injectable } from "tsyringe";
import { IFriends } from "../domain/models/IFriends";
import { IFriendsRepository } from "../domain/repositories/IFriendsRepository";

@injectable()
export default class ListUnconfirmedFriendsService {
    constructor(
        @inject('friendsRepository')
        private friendsRepository: IFriendsRepository,
    ) {}

    public async execute(userId: number): Promise<IFriends[]> {
        const unconfirmedFriends = await this.friendsRepository.findUnconfirmedFriends(userId);

        return unconfirmedFriends;
    }
}