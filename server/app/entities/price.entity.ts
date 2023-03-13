import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PriceHistory } from "./priceHistoty.entity";

@Entity("prices")
export class Price {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "bigint"
    })
    price!: number;
    
    @OneToMany(() => PriceHistory, (priceHistory) => priceHistory.price)
    priceHistories!: PriceHistory[];

}