import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Notification } from '../../notification/entity/notification.entity';

@Entity({ name: 'user' })
export class User {
   @PrimaryGeneratedColumn("uuid")
   uuid: string;

   @Column({ name: 'full_name', type: 'varchar', length: 64, nullable: false })
   fullName: string;

   @Column({ type: 'varchar', length: 16, nullable: true, unique: true })
   alias: string;

   @Column({ type: 'varchar', length: 64, nullable: false, unique: true })
   username: string;

   @Column({ type: 'varchar', length: 64, nullable: false, unique: true })
   password: string;

   @Column({ type: 'boolean', default: true })
   active: boolean;

   @OneToMany(type => Notification, nofitication => nofitication.toUser)
   notifications: Notification[];

}