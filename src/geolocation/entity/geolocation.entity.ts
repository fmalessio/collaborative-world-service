import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'geolocation' })
export class Geolocation {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: 'float8' })
  lat: number;

  @Column({ type: 'float8' })
  lng: number;

  @Column({ type: 'varchar', length: 256 })
  address: string;
}