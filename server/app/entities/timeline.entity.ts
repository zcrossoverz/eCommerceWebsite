import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity("timelines")
export class Timeline {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    content!: string;

    @CreateDateColumn()
    time!: Date;

    @ManyToOne(
        () => Order,
        order => order.timeline,
        { onDelete:"CASCADE" }
    )
    @JoinColumn({
        name: "order_id"
    })
    order!: Order;
}
