import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { IFriends } from "../../../domain/models/IFriends";

@Entity()
export class Friends implements IFriends {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    userId: number;

    @Column()
    friendId: number;

    @Column({ type: 'boolean', default: false })
    friendConfirmed: boolean;

    @CreateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}