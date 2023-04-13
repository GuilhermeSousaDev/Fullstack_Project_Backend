import { 
    CreateDateColumn,
    Entity, 
    ManyToOne, 
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { News } from "../../../../news/infra/typeorm/entites/News";
import { User } from "../../../../users/infra/typeorm/entities/User";
import { IFavorites } from "../../../domain/models/IFavorites";

@Entity()
export class Favorites implements IFavorites {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => News, news => news.favorites)
    news: News;

    @ManyToOne(() => User, user => user.favorites)
    user: User;

    @CreateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}