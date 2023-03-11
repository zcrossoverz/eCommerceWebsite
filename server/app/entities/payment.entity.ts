import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum EnumPaymentMethod {
    CASH_ON_DELIVERY, // Payment made in cash at the time of delivery.
    MOMO, // Purchase via MOMO payment gateway.
    NOT_SET
}

@Entity("payments")
export class Payment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "enum",
        enum: EnumPaymentMethod,
        default: EnumPaymentMethod.NOT_SET
    })
    method!: EnumPaymentMethod;

    @Column()
    amount!: string;

    @Column({
        type: "boolean",
        default: false
    })
    is_paid!: boolean;
    
}