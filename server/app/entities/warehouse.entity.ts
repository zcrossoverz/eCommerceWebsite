import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("warehouse")
export class Warehouse {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    quantity!: number;

}