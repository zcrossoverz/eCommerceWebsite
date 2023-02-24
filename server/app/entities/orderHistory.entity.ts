import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("order_history")
export class OrderHistory {
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn()
    done_at!: Date;

    @Column({
        type:"bigint"
    })
    amount!: string;
}