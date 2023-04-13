import { 
    Column, 
    CreateDateColumn,
    Entity, 
    ManyToOne,
    PrimaryGeneratedColumn, 
    UpdateDateColumn,
} from "typeorm";
import { IUser } from "../../../../users/domain/models/IUser";
import { User } from "../../../../users/infra/typeorm/entities/User";
import { IComment } from "../../../domain/models/IComment";
import { INews } from "../../../domain/models/INews";
import { News } from "./News";

@Entity()
export class Comment implements IComment {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    comment: string;

    @ManyToOne(() => News, news => news.comment)
    news: INews;

    @ManyToOne(() => User, user => user.comment)
    user: IUser;

    @CreateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}