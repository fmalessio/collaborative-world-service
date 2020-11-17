import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../category/entity/category.entity';

@Entity({ name: 'box' })
export class Box {
   @PrimaryGeneratedColumn("uuid")
   uuid: string;

   @Column({ type: 'varchar', length: 512, nullable: true })
   description?: string;

   @ManyToOne(type => Category, {
      cascade: false,
      nullable: false,
      eager: true
   })
   @JoinColumn({ name: 'category_id' })
   category: Category;

}