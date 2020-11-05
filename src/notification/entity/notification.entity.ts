import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { NOTIFICATION_STATE } from "../../shared/constant/enum.const";
import { User } from "../../user/entity/user.entity";

@Entity({ name: 'notification' })
export class Notification {

    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column({ type: 'varchar', length: 64, default: NOTIFICATION_STATE.NEW, nullable: false })
    state: string;

    @CreateDateColumn({ name: 'created_date', type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdDate: Date;

    @UpdateDateColumn({ name: 'updated_date', type: 'timestamp' })
    updatedDate: Date;

    @ManyToOne(type => User, {
        cascade: false,
        eager: true,
        nullable: true
    })
    @JoinColumn({ name: 'from_user_id' })
    fromUser: User;

    @ManyToOne(type => User, {
        cascade: false,
        nullable: false
    })
    @JoinColumn({ name: 'to_user_id' })
    toUser: User;

}
