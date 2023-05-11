import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";
import { Order } from "../entities/order.entity";
import { Brand } from "../entities/brand.entity";
import { Product } from "../entities/product.entity";
import { Image } from "../entities/image.entity";
import { Coupon } from "../entities/coupon.entity";
import { Specification } from "../entities/specification.entity";
import { ProductOption } from "../entities/productOption.entity";
import { OrderItem } from "../entities/orderItem.entity";
import { Timeline } from "../entities/timeline.entity";
import { CouponCondition } from "../entities/couponCondition.entity";
import { Payment } from "../entities/payment.entity";
import { Warehouse } from "../entities/warehouse.entity";
import { OrderHistory } from "../entities/orderHistory.entity";
import { Feedback } from "../entities/feedback.entity";
import { Price } from "../entities/price.entity";
import { PriceHistory } from "../entities/priceHistoty.entity";
import { InventoryInboundNote } from "../entities/inventoryInboundNote.entity";
import { InventoryTransaction } from "../entities/inventoryTransaction.entity";
import { Address } from "../entities/address.entity";
import { Notification } from "../entities/notification.entity";
import { WorkQueue } from "../entities/workQueue.entity";
import { Token } from "../entities/token.entity";




export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: ["error", "warn"],
  timezone: "+7",
  entities: [
    User,
    Order,
    Brand,
    Product,
    Image,
    Coupon,
    Specification,
    ProductOption,
    OrderItem,
    Timeline,
    CouponCondition,
    Payment,
    Warehouse,
    OrderHistory,
    Feedback,
    Price,
    PriceHistory,
    InventoryInboundNote,
    InventoryTransaction,
    Address,
    Notification,
    WorkQueue,
    Token,
  ],
  migrations: ["app/migrations/**/*.ts"],
  subscribers: [],
  charset: "utf8_unicode_ci",
});
