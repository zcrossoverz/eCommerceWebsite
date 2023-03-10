import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

export enum EnumTypeCoupon {
    "ship", // coupon about shipping, 100 - free ship, 50 - 50% off ship cost
    "percent", // percent of total order, 20 - reduce order total by 20% 
    "amount", // fix amount discount off by total order amount, 10000 - reduce order total by 10000 vnd
    "brand", //  applicable to a specific brand of products
}

@Entity("coupons")
export class Coupon {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    code!: string;

    @Column({
        type: "enum",
        enum: EnumTypeCoupon
    })
    type!: EnumTypeCoupon

    @Column()
    value!: number;

    @Column()
    startDate!: Date;

    @Column()
    endDate!: Date;

    @Column({
        default: true
    })
    active!: boolean;

    @Column()
    number!: number;

    @OneToMany(
        () => Order,
        order => order.coupon
    )
    orders!: Order[];
}