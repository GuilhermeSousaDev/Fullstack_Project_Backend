import { IUser } from "../../../users/domain/models/IUser";

export interface ICreateFriends {
    user: {
        id: number;
        name: string;
    };
    friendId: number;
}