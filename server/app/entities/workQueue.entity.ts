import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";

export enum EnumWorkQueueType {
    NONE,
    RATE,
    ORDER
} 

@Entity("work_queue")
export class WorkQueue {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'enum',
        enum: EnumWorkQueueType
    })
    type!: EnumWorkQueueType;

    @Column({
        type: 'boolean',
        default: false
    })
    is_done!: boolean;

    @ManyToOne(
        () => User,
        user => user.workqueue,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn({
        name: "user_id"
    })
    user!: User;

    @OneToOne(() => Product, { nullable: true })
    @JoinColumn({
        name: "product_id",
    })
    product!: Product;

}