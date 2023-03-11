import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


export enum EnumTypeNotify {
    "new_order",
    "user_feedback",
    "refund_request",
    "order_delivered"
}


@Entity("notifications")
export class Notification {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    content!: string;

    @Column({
        type: "enum",
        enum: EnumTypeNotify
    })
    type!: EnumTypeNotify;

    @Column({
        type: "boolean",
        default: false
    })
    is_read!: boolean;

    @Column()
    is_done!: boolean;

    @ManyToOne(
        () => User,
        user => user.notifications
    )
    @JoinColumn({
        name: "user_id"
    })
    user!: User;

    @CreateDateColumn()
    time!: Date;
}