import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Key {
    "avatar", // avatar user
    "thumbnail", // thumbnail
    "options" // options of product
}

@Entity("images")
export class Image {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({
        type: "enum",
        enum: Key,
    })
    key!: Key;

    @Column()
    value!: string;

}