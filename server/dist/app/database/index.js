"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const order_entity_1 = require("../entities/order.entity");
const brand_entity_1 = require("../entities/brand.entity");
const product_entity_1 = require("../entities/product.entity");
const image_entity_1 = require("../entities/image.entity");
const coupon_entity_1 = require("../entities/coupon.entity");
const specification_entity_1 = require("../entities/specification.entity");
const productOption_entity_1 = require("../entities/productOption.entity");
const orderItem_entity_1 = require("../entities/orderItem.entity");
const timeline_entity_1 = require("../entities/timeline.entity");
const couponCondition_entity_1 = require("../entities/couponCondition.entity");
const payment_entity_1 = require("../entities/payment.entity");
const warehouse_entity_1 = require("../entities/warehouse.entity");
const orderHistory_entity_1 = require("../entities/orderHistory.entity");
const feedback_entity_1 = require("../entities/feedback.entity");
const price_entity_1 = require("../entities/price.entity");
const priceHistoty_entity_1 = require("../entities/priceHistoty.entity");
const inventoryInboundNote_entity_1 = require("../entities/inventoryInboundNote.entity");
const inventoryTransaction_entity_1 = require("../entities/inventoryTransaction.entity");
const address_entity_1 = require("../entities/address.entity");
const notification_entity_1 = require("../entities/notification.entity");
const workQueue_entity_1 = require("../entities/workQueue.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: ["error", "warn"],
    timezone: "+7",
    entities: [
        user_entity_1.User,
        order_entity_1.Order,
        brand_entity_1.Brand,
        product_entity_1.Product,
        image_entity_1.Image,
        coupon_entity_1.Coupon,
        specification_entity_1.Specification,
        productOption_entity_1.ProductOption,
        orderItem_entity_1.OrderItem,
        timeline_entity_1.Timeline,
        couponCondition_entity_1.CouponCondition,
        payment_entity_1.Payment,
        warehouse_entity_1.Warehouse,
        orderHistory_entity_1.OrderHistory,
        feedback_entity_1.Feedback,
        price_entity_1.Price,
        priceHistoty_entity_1.PriceHistory,
        inventoryInboundNote_entity_1.InventoryInboundNote,
        inventoryTransaction_entity_1.InventoryTransaction,
        address_entity_1.Address,
        notification_entity_1.Notification,
        workQueue_entity_1.WorkQueue,
    ],
    migrations: [],
    subscribers: [],
    charset: "utf8_unicode_ci",
});
