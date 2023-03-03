import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("address")
export class Address {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    address!: string;

}