import { Donation } from "src/donation/entity/donation.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { NOTIFICATION_STATE } from "../../shared/constant/enum.const";

@Entity({ name: 'bc_block' })
export class BCBlock {

    constructor() {
        this.donation = new Donation();
    }

    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Generated("increment")
    nonce: number;

    @Column({ type: 'varchar', length: 512, default: NOTIFICATION_STATE.NEW, nullable: false })
    hash: string;

    @Column({ name: 'previous_hash', type: 'varchar', length: 512, nullable: true })
    previousHash: string;

    @Column({ name: 'next_hash', type: 'varchar', length: 512, nullable: true })
    nextHash: string;

    @CreateDateColumn({ name: 'created_date', type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdDate: Date;

    @ManyToOne(type => Donation, {
        cascade: false
    })
    @JoinColumn({ name: 'donation_id' })
    @Index("bc_block_donation_id_idx")
    donation: Donation;

}
