import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "../../../../users/infra/typeorm/entities/User";
import { INews } from "../../../domain/models/INews";
import { ILikes } from "../../../domain/models/ILikes";
import { Likes } from "./Likes";
import { Comment } from "./Comment";
import { IComment } from "../../../domain/models/IComment";
import { Favorites } from "../../../../favorites/infra/typeorm/entities/Favorites";

@Entity('news')
export class News implements INews {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    content: string;

    @Column()
    image: string;

    @OneToMany(() => Likes, likes => likes.news)
    likes: Likes[];

    @OneToMany(() => Comment, comment => comment.news)
    comment: IComment[];

    @OneToMany(() => Favorites, favorites => favorites.news)
    favorites: Favorites[];

    @ManyToOne(() => User, user => user.news)
    user: User;

    @CreateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}
