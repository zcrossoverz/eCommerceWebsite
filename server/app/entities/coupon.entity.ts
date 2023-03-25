import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { CouponCondition } from "./couponCondition.entity";

export enum EnumTypeCoupon {
    SHIP, // coupon about shipping, 100 - free ship, 50 - 50% off ship cost
    PERCENT, // percent of total order, 20 - reduce order total by 20% 
    AMOUNT, // fix amount discount off by total order amount, 10000 - reduce order total by 10000 vnd
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
    start_date!: string;

    @Column()
    end_date!: string;

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

    @OneToMany(
        () => CouponCondition,
        couponCondition => couponCondition.coupon
    )
    conditions!: CouponCondition[];
}