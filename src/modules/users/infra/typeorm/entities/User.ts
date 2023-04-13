import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn, 
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Favorites } from '../../../../favorites/infra/typeorm/entities/Favorites';
import { IComment } from '../../../../news/domain/models/IComment';
import { Comment } from '../../../../news/infra/typeorm/entites/Comment';
import { Likes } from '../../../../news/infra/typeorm/entites/Likes';
import { News } from '../../../../news/infra/typeorm/entites/News';
import { IUser } from '../../../domain/models/IUser';
 
@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => News, news => news.user)
    news: News[];

    @OneToMany(() => Likes, likes => likes.user)
    likes: Likes[];

    @OneToMany(() => Comment, comment => comment.user)
    comment: IComment[];

    @OneToMany(() => Favorites, favorites => favorites.user)
    favorites: Favorites[];

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updatedAt: Date;
}