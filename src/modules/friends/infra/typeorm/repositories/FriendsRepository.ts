import { getRepository, Repository } from "typeorm";
import { ICreateFriends } from "../../../domain/models/ICreateFriends";
import { IFriends } from "../../../domain/models/IFriends";
import { IFriendsRepository } from "../../../domain/repositories/IFriendsRepository";
import { Friends } from "../entities/Friends";

export default class FriendsRepository implements IFriendsRepository {
    ormRepository: Repository<Friends>;
    
    constructor() {
        this.ormRepository = getRepository(Friends);
    }   

    public async save(friends: IFriends): Promise<IFriends> {
        return this.ormRepository.save(friends);
    }

    public async create({ user, friendId }: ICreateFriends): Promise<IFriends> {
        return this.ormRepository.create({
            userId: user.id,
            friendId,
        });
    }

    public async remove(friends: IFriends): Promise<void> {
        this.ormRepository.remove(friends);
    }

    public async findUserFriends(userId: number): Promise<IFriends[]> {
        return this.ormRepository.find({
            where: [
                { userId, friendConfirmed: true },
                { friendId: userId, friendConfirmed: true }
            ],
        });
    }

    public async findFriendOrRequestedFriend(userId: number, friendId: number): Promise<IFriends> {
        return this.ormRepository.findOne({
            where: [
                { userId, friendId },
                { userId: friendId, friendId: userId },
            ],
        });
    }

    public async findUnconfirmedFriends(userId: number): Promise<IFriends[]> {
        return this.ormRepository.find({
            where: {
                userId,
                friendConfirmed: false,
            },
        });
    }

    public async findRequestedFriends(userId: number): Promise<IFriends[]> {
        return this.ormRepository.find({
            where: {
                friendId: userId,
                friendConfirmed: false,
            },
        });
    }
}