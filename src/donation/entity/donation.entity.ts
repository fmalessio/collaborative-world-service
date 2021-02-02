import { User } from 'src/user/entity/user.entity';
import {
   Column,
   CreateDateColumn,
   Entity,
   JoinColumn,
   ManyToOne,
   OneToMany,
   OneToOne,
   PrimaryGeneratedColumn
} from 'typeorm';
import { Geolocation } from '../../geolocation/entity/geolocation.entity';
import { DONATION_STATE } from '../../shared/constant/enum.const';
import { Box } from './box.entity';
import { DonationTransaction } from './donation-transaction.entity';

@Entity({ name: 'donation' })
export class Donation {

   @PrimaryGeneratedColumn("uuid")
   uuid: string;

   @Column({ type: 'boolean' })
   follow: boolean;

   @Column({ type: 'smallint' })
   amount: number;

   @Column({ type: 'varchar', length: 64, default: DONATION_STATE.CREATED, nullable: false })
   state: DONATION_STATE;

   @CreateDateColumn({ name: 'start_date', type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
   startDate: Date;

   @Column({ name: 'end_date', type: 'timestamp', nullable: true })
   endDate: Date;

   @Column({ name: 'path_photo_evidence', type: 'varchar', length: 256, nullable: true })
   pathPhotoEvidence: string;

   @ManyToOne(type => User, {
      nullable: false
   })
   @JoinColumn({ name: 'user_id' })
   user: User;

   @ManyToOne(type => Geolocation, {
      cascade: true,
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
      nullable: false,
      eager: true
   })
   @JoinColumn({ name: 'geolocation_id' })
   geolocation: Geolocation;

   @OneToOne(type => Box, {
      cascade: true,
      nullable: false,
      eager: true
   })
   @JoinColumn({ name: 'box_id' })
   box: Box;

   @OneToMany(type => DonationTransaction, transaction => transaction.donation, {
      cascade: true,
      eager: true
   })
   transactions: DonationTransaction[];

}