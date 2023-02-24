import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("prices")
export class Price {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "bigint"
    })
    price!: string;
    
}