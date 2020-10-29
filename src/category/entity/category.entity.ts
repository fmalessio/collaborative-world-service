import { Column, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";

@Entity()
@Tree("nested-set")
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ nullable: true })
    parentId: number;

    @TreeChildren()
    children: Category[];

    @TreeParent()
    parent: Category;

}
