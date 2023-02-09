import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum StatusOrder {
    "pending", // has been placed but hasn't yet been confirm or process - da ghi nhan don dat hang nhung chua duoc xu ly
    "processing", // in the process of being fulfilled and the necessary steps are being taken to get it shipped - dang xu ly
    "shipped", // on the way to the customer - dang giao hang
    "complete", // the order has been successfully completed, customer received their product - don hang giao thanh cong, khach hang nhan duoc san pham
    "cancelled", // cancelled by customer or seller - don hang bi huy
    "returned", // customer has returned or exchange - khach hang huy don hoac doi hang
}

@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "enum",
        enum: StatusOrder,
        default: StatusOrder.pending
    })
    status!: StatusOrder

    @CreateDateColumn()
    createAt!: Date;

    @UpdateDateColumn()
    updateAt!: Date;

    @Column({
        type: "int",
        nullable: true
    })
    coupon_id!: number;
}