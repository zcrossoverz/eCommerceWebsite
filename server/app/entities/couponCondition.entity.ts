import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Coupon } from "./coupon.entity";

export enum EnumTypeCouponCondition {
    ONE_PRODUCT, // Coupon is only applicable to a specific product.
    MINIMUM_PURCHASE, // Coupon is applicable only if the total purchase amount is above a certain threshold.
    BRAND, // Coupon is applicable to a specific brand of products.
    FIRST_PURCHASE, // Coupon is applicable only for a customer's first purchase.
}

@Entity("coupon_condition")
export class CouponCondition {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "enum",
        enum: EnumTypeCouponCondition
    })
    type!: EnumTypeCouponCondition;

    @Column()
    condition!: string;

    @ManyToOne(
        () => Coupon,
        coupon => coupon.conditions
    )
    @JoinColumn({
        name: "coupon_id"
    })
    coupon!: Coupon;
}