import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Order } from "./order.entity";
import { Address } from "./address.entity";
import { Notification } from "./notification.entity";
import { Feedback } from "./feedback.entity";
import { WorkQueue } from "./workQueue.entity";
import { Token } from "./token.entity";

export enum UserRole {
  ADMIN = "admin",
  MEMBER = "member",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
  })
  email!: string;

  @Column()
  password!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({
    nullable: true,
    transformer: {
      to(value: string) {
        return value ? value : null;
      },
      from(value: null | string) {
        return value;
      },
    },
    default: null,
  })
  verifyAt!: string;

  @Column({
    type: "varchar",
    length: 10,
    unique: true,
    nullable: true,
  })
  phone!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  role!: UserRole;

  @CreateDateColumn()
  createAt!: Date;

  @Column({
    type: "boolean",
    default: true,
  })
  isActive!: boolean;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @Column({
    nullable: true,
    transformer: {
      to(value: number) {
        return value ? value : null;
      },
      from(value: null | number) {
        return value;
      },
    },
  })
  default_address!: number;

  @OneToMany(() => Address, (address) => address.user)
  address!: Address[];

  @Column({
    type: "int",
    default: 0,
  })
  unread_message!: number;

  @OneToMany(() => Notification, (noti) => noti.user)
  notifications!: Notification[];

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedbacks!: Feedback[];

  @OneToMany(() => WorkQueue, (workqueue) => workqueue.user)
  workqueue!: WorkQueue[];

  @OneToMany(() => Token, (token) => token.user)
  token!: Token[];
}
