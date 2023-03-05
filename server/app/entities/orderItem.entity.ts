import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { InventoryInboundNote } from "./inventoryInboundNote.entity";
import { ProductOption } from "./productOption.entity";

@Entity("order_items")
export class OrderItem {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    quantity!: number;

    @OneToOne(() => ProductOption)
    @JoinColumn({
        name: "product_option_id"
    })
    product_option!: ProductOption;


    @ManyToOne(
        () => Order,
        order => order.orderItems,
        {
            nullable: true
        }
    )
    @JoinColumn({
        name: "order_id"
    })
    order!: Order;

    @ManyToOne(
        () => InventoryInboundNote,
        inventory => inventory.orderItems
    )
    @JoinColumn({
        name: "inventory_inbound_note_id"
    })
    inventoryInboundNote!: InventoryInboundNote;

}