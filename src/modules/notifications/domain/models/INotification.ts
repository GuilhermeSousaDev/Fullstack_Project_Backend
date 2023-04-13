export interface INotification {
    id: number;
    type: string;
    message: string;
    linkId: number;
    receiveUserId: number;
    createdAt: Date;
    deleteTime: Date;
    defineDeleteNotificationTime(): void;
}