import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn,
    BeforeInsert,
} from "typeorm";
import { addDays } from 'date-fns';
import { INotification } from "../../../domain/models/INotification";

@Entity()
export class Notification implements INotification {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    type: string;

    @Column()
    message: string;

    @Column()
    linkId: number;

    @Column()
    receiveUserId: number;

    @CreateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    deleteTime: Date;

    @BeforeInsert()
    defineDeleteNotificationTime() {
        const date = new Date();
        this.deleteTime = addDays(date, 3);
    }
}

