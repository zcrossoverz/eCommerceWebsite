import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}