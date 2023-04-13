import { ICreateFriends } from "../models/ICreateFriends";
import { IFriends } from "../models/IFriends";

export interface IFriendsRepository {
    save(friends: IFriends): Promise<IFriends>;
    create(data: ICreateFriends): Promise<IFriends>;
    remove(friends: IFriends): Promise<void>;
    findUserFriends(userId: number): Promise<IFriends[]>;
    findFriendOrRequestedFriend(userId: number, friendId: number): Promise<IFriends>;
    findUnconfirmedFriends(userId: number): Promise<IFriends[]>;
    findRequestedFriends(userId: number): Promise<IFriends[]>;
}