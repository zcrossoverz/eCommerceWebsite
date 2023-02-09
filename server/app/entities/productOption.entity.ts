import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("product_options")
export class ProductOption {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    color!: string;

    @Column()
    ram!: string;

    @Column()
    rom!: string;

    @Column()
    price!: number;
}