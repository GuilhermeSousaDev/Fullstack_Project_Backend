export interface IFriends {
    id: number; 
    userId: number;
    friendId: number;
    friendConfirmed: boolean;
    createdAt: Date;
    updatedAt: Date;
}