import { Geolocation } from 'src/geolocation/entity/geolocation.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'donation' })
export class Donation {
   @PrimaryGeneratedColumn("uuid")
   uuid: string;

   @Column({ type: 'boolean' })
   follow: boolean;

   @Column({ type: 'smallint' })
   ammount: number;

   @Column({ name: 'start_date', type: 'timestamp' })
   startDate: Date;

   @ManyToOne(type => Geolocation, {
      cascade: true
   })
   @JoinColumn({ name: 'geolocation_id' })
   geolocation: Geolocation;

   /* TODO:
 ESTADO
 
 {
 "geolocation":{
    "lat":-34.6409932,
    "lng":-58.6494715,
    "address":"Tebicuary 1825, Castelar, Provincia de Buenos Aires, Argentina"
 },
 "follow":"false",
 "ammount":1,
 "box":{
    "category":{
       "id":21,
       "name":"Detergente",
       "description":"",
       "parentId":19,
       "children":[
          
       ]
    },
    "description":"Prueba loco de descripción"
 },
 "startDate":1603911999875
 }
 */
}