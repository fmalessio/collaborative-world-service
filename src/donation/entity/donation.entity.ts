import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'geolocation' })
export class Donation {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: 'float8' })
  lat: number;

  @Column({ type: 'float8' })
  long: number;
}