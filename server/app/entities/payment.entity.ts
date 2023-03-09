import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({
        type: "boolean",
        default: false
    })
    is_paid!: boolean;
    
}