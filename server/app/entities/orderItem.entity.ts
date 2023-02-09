import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("order_items")
export class OrderItem {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    quantity!: number;

}