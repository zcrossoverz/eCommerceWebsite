import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Coupon } from "./coupon.entity";
import { User } from "./user.entity";
import { OrderItem } from "./orderItem.entity";
import { Timeline } from "./timeline.entity";

export enum EnumStatusOrder {
    PENDING = "pending", // has been placed but hasn't yet been confirm or process - da ghi nhan don dat hang nhung chua duoc xu ly
    PROCESSING = "processing", // in the process of being fulfilled and the necessary steps are being taken to get it shipped - dang xu ly
    SHIPPED = "shipped", // on the way to the customer - dang giao hang
    COMPLETE = "complete", // the order has been successfully completed, customer received their product - don hang giao thanh cong, khach hang nhan duoc san pham
    CANCELLED = "cancelled", // cancelled by customer or seller - don hang bi huy
    RETURNED = "returned", // customer has returned or exchange - khach hang huy don hoac doi hang
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
    createAt!: Date;

    @UpdateDateColumn()
    updateAt!: Date;

    @Column()
    address!: string;

    @OneToOne(() => Coupon, { nullable:true })
    @JoinColumn({
        name: "coupon_id"
    })
    coupon_id!: Coupon;


    @ManyToOne(
        () => User,
        user => user.orders
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

    @OneToMany(
        () => Coupon, 
        coupon => coupon.orders, 
        { nullable: true }
    )
    @JoinColumn({
        name: "coupon_id"
    })
    coupon!: Coupon;

    @OneToMany(
        () => Timeline,
        timeline => timeline
    )
    timeline!: Timeline[];

}