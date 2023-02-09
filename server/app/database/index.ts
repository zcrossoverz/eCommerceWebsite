import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entities/user.entity";
import { Order } from "../entities/order.entity";



export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: ["error","query","warn"],
    entities: [User, Order],
    migrations: [],
    subscribers: [],
    charset: "utf8_unicode_ci"
});