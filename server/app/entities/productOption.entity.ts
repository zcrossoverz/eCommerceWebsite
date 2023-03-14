import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { Price } from "./price.entity";
import { Warehouse } from "./warehouse.entity";
import { InventoryTransaction } from "./inventoryTransaction.entity";
import { Image } from "./image.entity";

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
        product => product.productOptions,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn({
        name: "product_id"
    })
    product!: Product;

    @OneToOne(() => Price, { onDelete: "CASCADE" })
    @JoinColumn({ name: "price_id" })
    price!: Price;

    @OneToOne(() => Warehouse, { onDelete: "CASCADE" })
    @JoinColumn({ name: "warehouse_id" })
    warehouse!: Warehouse;

    @OneToMany(
        () => InventoryTransaction,
        inventorytrans => inventorytrans.product_option
    )
    inventory_transactions!: InventoryTransaction[];

    @OneToOne(() => Image, { onDelete: "CASCADE" })
    @JoinColumn({ name: "image" })
    image!: Image;

}