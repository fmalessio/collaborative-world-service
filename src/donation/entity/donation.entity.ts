import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'geolocation' })
export class Donation {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column()
  lat: number;

  @Column()
  long: number;
}