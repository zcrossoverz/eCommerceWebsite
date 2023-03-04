import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity("order_items")
export class OrderItem {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    quantity!: number;


    @ManyToOne(
        () => Order,
        order => order.orderItems
    )
    @JoinColumn({
        name: "order_id"
    })
    order!: Order;

}