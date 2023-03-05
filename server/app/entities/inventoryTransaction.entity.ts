import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductOption } from "./productOption.entity";

export enum EnumInventoryTransactionType {
    IN, // add to warehouse
    OUT // sale
}

@Entity("inventory_transactions")
export class InventoryTransaction {
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn()
    date!: Date;

    @Column({
        type: "enum",
        enum: EnumInventoryTransactionType
    })
    type!: EnumInventoryTransactionType;

    @Column()
    quantity!: number;

    @Column({
        type: "bigint"
    })
    amount!: string;

    @ManyToOne(
        () => ProductOption,
        product_option => product_option.inventory_transactions
    )
    @JoinColumn({
        name: "product_option_id"
    })
    product_option!: ProductOption;

}