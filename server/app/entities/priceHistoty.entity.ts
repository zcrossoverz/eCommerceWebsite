import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Price } from "./price.entity";

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

    @ManyToOne(() => Price, (price) => price.priceHistories)
    @JoinColumn({
        name: "price_id"
    })
    price!: Price;
}