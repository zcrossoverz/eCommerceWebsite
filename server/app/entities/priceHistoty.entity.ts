import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Price } from "./price.entity";

@Entity("price_history")
export class PriceHistory {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type:"bigint"
    })
    old_price!: number;

    @Column({
        type:"bigint"
    })
    new_price!: number;

    @CreateDateColumn()
    update_at!: string;

    @ManyToOne(() => Price, (price) => price.priceHistories)
    @JoinColumn({
        name: "price_id"
    })
    price!: Price;
}