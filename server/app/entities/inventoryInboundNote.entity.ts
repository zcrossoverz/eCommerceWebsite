import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./orderItem.entity";

export enum EnumInventoryInboundStatus {
    PENDING,
    COMPLETED,
    CANCELLED
}

@Entity("inventory_inbound_notes")
export class InventoryInboundNote {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "enum",
        enum: EnumInventoryInboundStatus,
        default: EnumInventoryInboundStatus.PENDING
    })
    status!: EnumInventoryInboundStatus;

    @OneToMany(
        () => OrderItem,
        item => item.inventoryInboundNote
    )
    orderItems!: OrderItem[];

    @CreateDateColumn()
    create_at!: Date;

}