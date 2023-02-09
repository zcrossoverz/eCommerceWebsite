import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity("product_options")
export class ProductOption {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    color!: string;

    @Column()
    ram!: string;

    @Column()
    rom!: string;

    @Column()
    price!: number;

    @ManyToOne(
        () => Product,
        product => product.productOptions
    )
    @JoinColumn({
        name: "product_id"
    })
    product!: Product;

}