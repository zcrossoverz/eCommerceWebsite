import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


export enum EnumTypeNotify {
    NEW_ORDER,
    USER_FEEDBACK,
}


@Entity("notifications")
export class Notification {
    @PrimaryGeneratedColumn()
    id!: number;

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