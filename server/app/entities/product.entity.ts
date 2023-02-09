import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Category } from "./category.entity";
import { Specification } from "./specification.entity";

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

    @OneToMany(
        () => Specification,
        specification => specification.product
    )
    specifications!: Specification[]
}