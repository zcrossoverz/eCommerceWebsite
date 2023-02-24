import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("reviews")
export class Review {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "int",
        nullable: false,
    })
    rate!: number;

    @Column({
        nullable: true
    })
    comment!: string;

    @CreateDateColumn()
    create_at!: Date;
    
}
