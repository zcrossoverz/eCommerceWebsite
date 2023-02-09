import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Category } from "./category.entity";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @CreateDateColumn()
    createAt!: Date;

    @UpdateDateColumn()
    updateAt!: Date;

    @ManyToOne(
        () => Category,
        category => category.products
    )
    @JoinColumn({
        name:"category_id"
    })
    category!: Category;
}