import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Order } from "./order.entity";

export enum EnumPaymentMethod {
    CASH_ON_DELIVERY, // Payment made in cash at the time of delivery.
    MOMO, // Purchase via MOMO payment gateway.
}

@Entity("payments")
export class Payment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "enum",
        enum: EnumPaymentMethod,
        default: EnumPaymentMethod.CASH_ON_DELIVERY
    })
    method!: EnumPaymentMethod;

    @Column()
    amount!: string;

    @Column({
        type: "boolean",
        default: false
    })
    is_paid!: boolean;

    @OneToOne(() => Order,
    {
        onDelete: "CASCADE"
    })
    order!: Order;
    
}