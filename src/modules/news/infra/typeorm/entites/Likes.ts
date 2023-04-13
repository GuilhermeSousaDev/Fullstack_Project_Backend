import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "../../../../users/infra/typeorm/entities/User";
import { News } from "./News";

@Entity()
export class Likes {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => User, user => user.likes, { eager: true })
    user: User;

    @ManyToOne(() => News, news => news.likes, { eager: true })
    news: News;

    @CreateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp',  default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}
