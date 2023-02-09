import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from "typeorm";
import { Order } from "./order.entity";

export enum UserRole {
    ADMIN = 'admin',
    MEMBER = 'member'
};

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({
        "unique": true
    })
    email!: string;

    @Column()
    password!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    address!: string;

    @Column({
        type: "varchar",
        length: 10,
        unique: true
    })
    phone!: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.MEMBER
    })
    role!: UserRole;

    @CreateDateColumn()
    createAt!: Date;

    @Column()
    isActive: boolean = true;


    @OneToMany(
        () => Order,
        order => order.user
    )
    orders!: Order[]

}