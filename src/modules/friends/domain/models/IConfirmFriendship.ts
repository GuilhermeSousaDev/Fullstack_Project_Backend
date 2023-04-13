export interface IConfirmfriendship {
    user: {
        id: number;
        name: string;
    };
    friendId: number;
    friendConfirmed: boolean;
}