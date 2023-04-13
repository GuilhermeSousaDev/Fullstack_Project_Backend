import { IUser } from "../../../users/domain/models/IUser";

export interface ICreateNews {
    title: string;
    description: string;
    content: string;
    user: IUser;
    username?: string;
    file?: {
        name: string;
        path: string;
    };
}
