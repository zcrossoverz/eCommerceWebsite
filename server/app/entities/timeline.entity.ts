import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("timelines")
export class Timeline {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    content!: string;

    @CreateDateColumn()
    time!: Date;
}
