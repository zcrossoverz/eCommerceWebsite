import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { Price } from "./price.entity";

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

    @ManyToOne(
        () => Product,
        product => product.productOptions
    )
    @JoinColumn({
        name: "product_id"
    })
    product!: Product;

    @OneToOne(() => Price)
    @JoinColumn({ name: "price_id" })
    price!: Price;

}