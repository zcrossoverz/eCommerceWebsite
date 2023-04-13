import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Coupon } from "./coupon.entity";
import { User } from "./user.entity";
import { OrderItem } from "./orderItem.entity";
import { Timeline } from "./timeline.entity";
import { Payment } from "./payment.entity";

export enum EnumStatusOrder {
    PENDING, // has been placed but hasn't yet been confirm or process - da ghi nhan don dat hang nhung chua duoc xu ly
    PROCESSING, // in the process of being fulfilled and the necessary steps are being taken to get it shipped - dang xu ly
    SHIPPED, // on the way to the customer - dang giao hang
    COMPLETED, // the order has been successfully completed, customer received their product - don hang giao thanh cong, khach hang nhan duoc san pham
    CANCELLED, // cancelled by customer or seller - don hang bi huy
    RETURNED, // customer has returned or exchange - khach hang huy don hoac doi hang
    RETURNED_COMPLETED 
}

@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "enum",
        enum: EnumStatusOrder,
        default: EnumStatusOrder.PENDING
    })
    status!: EnumStatusOrder

    @CreateDateColumn()
    createAt!: string;

    @UpdateDateColumn()
    updateAt!: string;

    @Column()
    address!: string;


    @ManyToOne(
        () => User,
        user => user.orders,
        {
            onDelete:"CASCADE"
        }
    )
    @JoinColumn({
        name: "user_id"
    })
    user!: User;

    @OneToMany(
        () => OrderItem,
        orderItem => orderItem.order
    )
    orderItems!: OrderItem[];

    @ManyToOne(
        () => Coupon, 
        coupon => coupon.orders, 
        { nullable: true,
        },
        
    )
    @JoinColumn({
        name: "coupon_id",
        
    })
    coupon!: Coupon | null;

    @OneToMany(
        () => Timeline,
        timeline => timeline.order
    )
    timeline!: Timeline[];

    @OneToOne(() => Payment, {
        onDelete: "CASCADE"
    })
    @JoinColumn({
        name: "payment_id"
    })
    payment!: Payment;

}