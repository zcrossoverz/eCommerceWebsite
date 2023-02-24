import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { User } from "./user.entity";

export enum EnumTypeImage {
    avatar = "avatar", // avatar user
    thumbnail = "thumbnail", // thumbnail
    options = "options" // options of product
}

@Entity("images")
export class Image {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({
        type: "enum",
        enum: EnumTypeImage,
    })
    type!: EnumTypeImage;

    @Column()
    image_url!: string;


    @OneToOne(() => User, { nullable:true })
    @JoinColumn({
        name: "user_id"
    })
    user!: User;

    @ManyToOne(
        () => Product,
        product => product.images,
        {
            nullable: true
        }
    )
    @JoinColumn({
        name: "product_id"
    })
    product!: Product;

}