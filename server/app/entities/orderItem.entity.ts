import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { InventoryInboundNote } from "./inventoryInboundNote.entity";
import { ProductOption } from "./productOption.entity";

@Entity("order_items")
export class OrderItem {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    quantity!: number;

    @ManyToOne(() => ProductOption, {
        onDelete: "CASCADE"
    })
    @JoinColumn({
        name: "product_option_id"
    })
    product_option!: ProductOption;


    @ManyToOne(
        () => Order,
        order => order.orderItems,
        {
            nullable: true,
            onDelete: "CASCADE"
        }
    )
    @JoinColumn({
        name: "order_id"
    })
    order!: Order;

    @ManyToOne(
        () => InventoryInboundNote,
        inventory => inventory.orderItems,
        {
            nullable: true,
            onDelete: "CASCADE"
        }
    )
    @JoinColumn({
        name: "inventory_inbound_note_id"
    })
    inventoryInboundNote!: InventoryInboundNote;

}