import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("price_history")
export class PriceHistory {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type:"bigint"
    })
    old_price!: string;

    @Column({
        type:"bigint"
    })
    new_price!: string;

    @CreateDateColumn()
    update_at!: Date;
}