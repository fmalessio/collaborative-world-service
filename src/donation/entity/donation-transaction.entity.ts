import { User } from 'src/user/entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DONATION_STATE } from '../../shared/constant/enum.const';
import { Donation } from './donation.entity';

@Entity({ name: 'donation_transaction' })
export class DonationTransaction {
   @PrimaryGeneratedColumn("uuid")
   uuid: string;

   @Column({ name: 'generation_date', type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
   generationDate: Date;

   @Column({ type: 'varchar', length: 64, default: DONATION_STATE.CREATED, nullable: false })
   state: string;

   @ManyToOne(type => Donation, {
      nullable: false
   })
   @JoinColumn({ name: 'donation_id' })
   donation: Donation;

   @ManyToOne(type => User, {
      nullable: true,
      eager: false
   })
   @JoinColumn({ name: 'collaborator_id' })
   collaborator: User;

}