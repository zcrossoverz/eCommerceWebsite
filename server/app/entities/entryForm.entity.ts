import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum EnumEntryFormStatus {
    PENDING,
    COMPLETED,
    CANCELLED
}

@Entity("entry_forms")
export class EntryForm {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    quantity!: number;

    @Column({
        type: "enum",
        enum: EnumEntryFormStatus,
        default: EnumEntryFormStatus.PENDING
    })
    status!: EnumEntryFormStatus;

}