import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @OneToMany(
        () => Product,
        product => product.category
    )
    @JoinColumn()
    products!: Product[];
}