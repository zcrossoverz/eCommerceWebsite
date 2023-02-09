import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { Order } from "./order.entity";

@Entity("order_items")
export class OrderItem {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    quantity!: number;

    @ManyToOne(
        () => Product,
        product => product.orderItems
    )
    @JoinColumn({
        name: "product_option_id"
    })
    product!: Product;

    @ManyToOne(
        () => Order,
        order => order.orderItems
    )
    @JoinColumn({
        name: "order_id"
    })
    order!: Order;

}