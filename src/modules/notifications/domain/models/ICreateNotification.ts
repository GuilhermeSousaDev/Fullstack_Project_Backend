export interface ICreateNotification {
    type: 'friend' | 'news' | 'liked' | 'feedback';
    message: string;
    linkId: number;
    receiveUserId: number;
}