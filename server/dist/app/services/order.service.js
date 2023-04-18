"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddressOrder = exports.updateStatusOrder = exports.deleteOrder = exports.getAllOrderByUser = exports.getAllOrder = exports.getOneOrder = exports.createOrder = exports.instanceOfErrorInfo = void 0;
const typeorm_1 = require("typeorm");
const database_1 = require("../database");
const coupon_entity_1 = require("../entities/coupon.entity");
const notification_entity_1 = require("../entities/notification.entity");
const order_entity_1 = require("../entities/order.entity");
const orderItem_entity_1 = require("../entities/orderItem.entity");
const payment_entity_1 = require("../entities/payment.entity");
const productOption_entity_1 = require("../entities/productOption.entity");
const timeline_entity_1 = require("../entities/timeline.entity");
const user_entity_1 = require("../entities/user.entity");
const error_1 = require("../utils/error");
const response_1 = require("../utils/response");
const inventory_service_1 = require("./inventory.service");
const notification_service_1 = require("./notification.service");
const payment_service_1 = require("./payment.service");
const workqueue_service_1 = require("./workqueue.service");
var EnumTimelineStatus;
(function (EnumTimelineStatus) {
    EnumTimelineStatus["ORDER_INIT"] = "\u0110\u00E3 \u0111\u1EB7t h\u00E0ng";
    EnumTimelineStatus["ORDER_PROCESSING"] = "\u0110\u00E3 \u0111\u01B0\u1EE3c ti\u1EBFp nh\u1EADn v\u00E0 x\u1EED l\u00FD";
    EnumTimelineStatus["ORDER_SHIPPED"] = "\u0110\u00E3 b\u00E0n giao cho \u0111\u01A1n v\u1ECB v\u1EADn chuy\u1EC3n.";
    EnumTimelineStatus["ORDER_DELIVERED"] = "Giao h\u00E0ng th\u00E0nh c\u00F4ng";
    EnumTimelineStatus["ORDER_CANCELLED"] = "\u0110\u01A1n h\u00E0ng \u0111\u00E3 h\u1EE7y";
    EnumTimelineStatus["ORDER_RETURNED"] = "\u0110ang x\u1EED l\u00FD y\u00EAu c\u1EA7u tr\u1EA3 h\u00E0ng";
    EnumTimelineStatus["ORDER_RETURNED_COMPLETED"] = "Tr\u1EA3 h\u00E0ng th\u00E0nh c\u00F4ng";
})(EnumTimelineStatus || (EnumTimelineStatus = {}));
const instanceOfErrorInfo = (object) => {
    return Object.keys(object).includes("error_order");
};
exports.instanceOfErrorInfo = instanceOfErrorInfo;
const createOrder = (user_id, products, address) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userRepo = database_1.AppDataSource.getRepository(user_entity_1.User);
    const orderRepo = database_1.AppDataSource.getRepository(order_entity_1.Order);
    const productOptRepo = database_1.AppDataSource.getRepository(productOption_entity_1.ProductOption);
    const orderItemRepo = database_1.AppDataSource.getRepository(orderItem_entity_1.OrderItem);
    const paymentRepo = database_1.AppDataSource.getRepository(payment_entity_1.Payment);
    const timelineRepo = database_1.AppDataSource.getRepository(timeline_entity_1.Timeline);
    if (!user_id || !products)
        return (0, error_1.BadRequestError)("missing information");
    const user = yield userRepo.findOne({
        where: {
            id: user_id,
        },
        relations: {
            address: true,
        },
    });
    if (!user)
        return (0, error_1.BadRequestError)("user not found");
    let OrderError;
    (function (OrderError) {
        OrderError[OrderError["quantity_exceed"] = 0] = "quantity_exceed";
        OrderError[OrderError["item_not_found"] = 1] = "item_not_found";
        OrderError[OrderError["quantity_not_valid"] = 2] = "quantity_not_valid";
    })(OrderError || (OrderError = {}));
    const err = {
        error: false,
        info: [],
    };
    const setError = (type, product_option_id) => {
        err.error = true;
        err.info.push({
            type: OrderError[type],
            product_option_id,
            error_order: true,
        });
    };
    const items = [];
    yield Promise.all(products.map((e) => __awaiter(void 0, void 0, void 0, function* () {
        const rs = yield productOptRepo.findOne({
            where: { id: e.product_option_id },
            relations: {
                price: true,
                warehouse: true,
            },
        });
        if (!rs) {
            setError(OrderError.item_not_found, e.product_option_id);
            return;
        }
        if (rs.warehouse.quantity < e.quantity) {
            setError(OrderError.quantity_exceed, e.product_option_id);
            return;
        }
        if (e.quantity <= 0) {
            setError(OrderError.quantity_not_valid, e.product_option_id);
            return;
        }
        return items.push({
            item: rs,
            quantity: e.quantity,
            amount: Number(rs.price.price) * e.quantity,
        });
    })));
    if (!address && !user.default_address)
        return (0, error_1.BadRequestError)("please fill address");
    if (err.error)
        return err.info[0];
    const new_order = yield orderRepo.save(orderRepo.create({
        address: address
            ? address
            : (_a = user.address.find((e) => e.id === user.default_address)) === null || _a === void 0 ? void 0 : _a.address,
        user: user,
        payment: yield paymentRepo.save(paymentRepo.create({
            amount: String(items.reduce((acc, current) => acc + current.amount, 0)),
        })),
    }));
    items.map((e) => __awaiter(void 0, void 0, void 0, function* () {
        yield orderItemRepo.save(orderItemRepo.create({
            order: new_order,
            product_option: e.item,
            quantity: e.quantity,
            price: e.amount / e.quantity,
        }));
        yield (0, inventory_service_1.decreaseStock)(e.item.id, e.quantity);
    }));
    yield timelineRepo.save(timelineRepo.create({
        order: new_order,
        content: EnumTimelineStatus.ORDER_INIT,
    }));
    return new_order;
});
exports.createOrder = createOrder;
const getOneOrder = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const orderRepo = database_1.AppDataSource.getRepository(order_entity_1.Order);
    const rs = yield orderRepo.findOne({
        where: { id: order_id },
        relations: {
            user: {
                address: true,
            },
            orderItems: {
                product_option: {
                    product: true,
                    image: true,
                },
            },
            coupon: true,
            timeline: true,
            payment: true,
        },
    });
    if (!rs)
        return (0, error_1.BadRequestError)("order not found");
    const _c = rs.payment, { id: _, method: method } = _c, payment = __rest(_c, ["id", "method"]);
    return {
        order_id: rs.id,
        status: order_entity_1.EnumStatusOrder[rs.status],
        create_at: rs.createAt,
        update_at: rs.updateAt,
        address: rs.address,
        user: rs.user,
        coupon: (_b = rs.coupon) === null || _b === void 0 ? void 0 : _b.code,
        order_items: rs.orderItems.map((e) => {
            return {
                product_name: e.product_option.product.name,
                product_option_id: e.product_option.id,
                ram: e.product_option.ram,
                rom: e.product_option.rom,
                color: e.product_option.color,
                price: e.product_option.price,
                quantity: e.quantity,
                image: e.product_option.image.image_url,
                prices: e.price,
            };
        }),
        payment: Object.assign({ method: payment_entity_1.EnumPaymentMethod[method], previous_amount: rs.coupon &&
                (rs.coupon.type === coupon_entity_1.EnumTypeCoupon.PERCENT
                    ? (Number(rs.payment.amount) / (100 - Number(rs.coupon.value))) * 100
                    : Number(rs.payment.amount) + Number(rs.coupon.value)), discount: rs.coupon &&
                `${rs.coupon.type === coupon_entity_1.EnumTypeCoupon.PERCENT
                    ? (Number(rs.payment.amount) / (100 - Number(rs.coupon.value))) *
                        100 -
                        Number(rs.payment.amount)
                    : rs.coupon.value}` }, payment),
        timeline: rs.timeline.sort((a, b) => a.id - b.id),
    };
});
exports.getOneOrder = getOneOrder;
const getAllOrder = (limit, page, order = "newest", status = -1, method = -1, paid = -1, search = '') => __awaiter(void 0, void 0, void 0, function* () {
    const orderRepo = database_1.AppDataSource.getRepository(order_entity_1.Order);
    const offset = (page - 1) * limit;
    const orderById = order === "oldest" ? "ASC" : "DESC";
    const [rs, count] = yield orderRepo.findAndCount({
        relations: {
            user: true,
            orderItems: {
                product_option: {
                    product: true,
                },
            },
            coupon: true,
            timeline: true,
            payment: true,
        },
        take: limit,
        skip: offset,
        order: {
            id: orderById,
        },
        where: {
            status: status !== -1 ? status + 1 : undefined,
            id: Number(search) ? (0, typeorm_1.ILike)(Number(search)) : undefined,
            payment: {
                method: method !== -1 ? method : undefined,
                is_paid: paid !== -1 ? (paid === 0 ? false : true) : undefined,
            },
        },
    });
    const last_page = Math.ceil(count / limit);
    const prev_page = page - 1 < 1 ? null : page - 1;
    const next_page = page + 1 > last_page ? null : page + 1;
    return count
        ? {
            current_page: page,
            prev_page,
            next_page,
            last_page,
            data_per_page: limit,
            total: count,
            data: rs.map((e) => {
                const _a = e.payment, { id: _, method: method } = _a, payment = __rest(_a, ["id", "method"]);
                return {
                    order_id: e.id,
                    status: order_entity_1.EnumStatusOrder[e.status],
                    create_at: e.createAt,
                    update_at: e.updateAt,
                    address: e.address,
                    user: e.user,
                    order_items: e.orderItems.map((el) => {
                        return {
                            product_name: el.product_option.product.name,
                            product_option_id: el.product_option.id,
                            ram: el.product_option.ram,
                            rom: el.product_option.rom,
                            color: el.product_option.color,
                            price: el.product_option.price,
                            quantity: el.quantity,
                            prices: el.price,
                        };
                    }),
                    payment: Object.assign({ method: payment_entity_1.EnumPaymentMethod[method] }, payment),
                    timeline: e.timeline.sort((a, b) => a.id - b.id),
                };
            }),
        }
        : (0, error_1.BadRequestError)("order empty");
});
exports.getAllOrder = getAllOrder;
const getAllOrderByUser = (user_id, limit, page) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user_id)
        return (0, error_1.BadRequestError)("user id empty");
    const orderRepo = database_1.AppDataSource.getRepository(order_entity_1.Order);
    const offset = (page - 1) * limit;
    const [rs, count] = yield orderRepo.findAndCount({
        where: {
            user: {
                id: user_id,
            },
        },
        relations: {
            user: true,
            orderItems: {
                product_option: {
                    product: true,
                    image: true,
                },
            },
            coupon: true,
            timeline: true,
            payment: true,
        },
        take: limit,
        skip: offset,
    });
    const last_page = Math.ceil(count / limit);
    const prev_page = page - 1 < 1 ? null : page - 1;
    const next_page = page + 1 > last_page ? null : page + 1;
    return count
        ? {
            current_page: page,
            prev_page,
            next_page,
            last_page,
            data_per_page: limit,
            total: count,
            data: rs.map((e) => {
                const _a = e.payment, { id: _, method: method } = _a, payment = __rest(_a, ["id", "method"]);
                return {
                    order_id: e.id,
                    status: order_entity_1.EnumStatusOrder[e.status],
                    create_at: e.createAt,
                    update_at: e.updateAt,
                    address: e.address,
                    user: e.user,
                    order_items: e.orderItems.map((el) => {
                        return {
                            product_name: el.product_option.product.name,
                            product_option_id: el.product_option.id,
                            ram: el.product_option.ram,
                            rom: el.product_option.rom,
                            color: el.product_option.color,
                            price: el.product_option.price,
                            quantity: el.quantity,
                            prices: el.price,
                            image: el.product_option.image.image_url,
                        };
                    }),
                    payment: Object.assign({ method: payment_entity_1.EnumPaymentMethod[method] }, payment),
                    timeline: e.timeline.sort((a, b) => a.id - b.id),
                };
            }),
        }
        : (0, error_1.BadRequestError)("order empty");
});
exports.getAllOrderByUser = getAllOrderByUser;
const deleteOrder = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const OrderRepo = database_1.AppDataSource.getRepository(order_entity_1.Order);
    const rs = yield OrderRepo.delete({ id: order_id });
    return rs.affected ? (0, response_1.success)() : (0, response_1.failed)();
});
exports.deleteOrder = deleteOrder;
const addTimeline = (order, message) => __awaiter(void 0, void 0, void 0, function* () {
    const timelineRepo = database_1.AppDataSource.getRepository(timeline_entity_1.Timeline);
    return yield timelineRepo.save(timelineRepo.create({
        content: message,
        order: order,
    }));
});
const updateStatusOrder = (order_id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const orderRepo = database_1.AppDataSource.getRepository(order_entity_1.Order);
    const order = yield orderRepo.findOne({
        where: { id: order_id },
        relations: {
            user: true,
            orderItems: {
                product_option: {
                    product: true,
                },
            },
            coupon: true,
            timeline: true,
            payment: true,
        },
    });
    if (!order)
        return (0, error_1.BadRequestError)("order not found");
    if (!status)
        return (0, error_1.BadRequestError)("status field cannot be empty");
    if (!(status in order_entity_1.EnumStatusOrder))
        return (0, error_1.BadRequestError)("status not valid");
    switch (String(order_entity_1.EnumStatusOrder[status])) {
        case String(order_entity_1.EnumStatusOrder.PENDING): {
            return (0, error_1.BadRequestError)("Error");
        }
        case String(order_entity_1.EnumStatusOrder.PROCESSING): {
            if (order.status === order_entity_1.EnumStatusOrder.PENDING) {
                if (order.payment.method === payment_entity_1.EnumPaymentMethod.NOT_SET) {
                    return (0, error_1.BadRequestError)("please select method payment for order");
                }
                if (order.payment.is_paid ||
                    order.payment.method === payment_entity_1.EnumPaymentMethod.CASH_ON_DELIVERY) {
                    yield addTimeline(order, EnumTimelineStatus.ORDER_PROCESSING);
                    yield (0, notification_service_1.addNewNoti)(notification_entity_1.EnumTypeNotify.NEW_ORDER, order.id, order.user.id);
                    return (yield orderRepo.update({ id: order.id }, { status: Number(order_entity_1.EnumStatusOrder[status]) })).affected
                        ? (0, response_1.success)()
                        : (0, response_1.failed)();
                }
                return (0, error_1.BadRequestError)("this order has not been paid yet");
            }
            return (0, error_1.BadRequestError)("error when update status");
        }
        case String(order_entity_1.EnumStatusOrder.SHIPPED): {
            if (order.status === order_entity_1.EnumStatusOrder.PROCESSING) {
                yield addTimeline(order, EnumTimelineStatus.ORDER_SHIPPED);
                yield (0, notification_service_1.addNewNoti)(notification_entity_1.EnumTypeNotify.SHIPPED, order.id, order.user.id);
                return (yield orderRepo.update({ id: order.id }, { status: Number(order_entity_1.EnumStatusOrder[status]) })).affected
                    ? (0, response_1.success)()
                    : (0, response_1.failed)();
            }
            return (0, error_1.BadRequestError)("error when update status");
        }
        case String(order_entity_1.EnumStatusOrder.COMPLETED): {
            if (order.status === order_entity_1.EnumStatusOrder.SHIPPED) {
                if (order.payment.method === payment_entity_1.EnumPaymentMethod.CASH_ON_DELIVERY)
                    yield (0, payment_service_1.markAsPaid)(order.payment);
                yield addTimeline(order, EnumTimelineStatus.ORDER_DELIVERED);
                yield (0, notification_service_1.addNewNoti)(notification_entity_1.EnumTypeNotify.COMPLETED, order.id, order.user.id);
                yield Promise.all(order.orderItems.map((e) => __awaiter(void 0, void 0, void 0, function* () {
                    return yield (0, workqueue_service_1.addRemindFeedback)(e.product_option.product, order.user);
                })));
                return (yield orderRepo.update({ id: order.id }, { status: Number(order_entity_1.EnumStatusOrder[status]) })).affected
                    ? (0, response_1.success)()
                    : (0, response_1.failed)();
            }
            return (0, error_1.BadRequestError)("error when update status");
        }
        case String(order_entity_1.EnumStatusOrder.CANCELLED): {
            if (order.status === order_entity_1.EnumStatusOrder.PENDING) {
                yield addTimeline(order, EnumTimelineStatus.ORDER_CANCELLED);
                yield (0, notification_service_1.addNewNoti)(notification_entity_1.EnumTypeNotify.CANCELLED, order.id, order.user.id);
                order.orderItems.map((e) => __awaiter(void 0, void 0, void 0, function* () {
                    yield (0, inventory_service_1.increaseStock)(e.product_option.id, e.quantity);
                }));
                return (yield orderRepo.update({ id: order.id }, { status: Number(order_entity_1.EnumStatusOrder[status]) })).affected
                    ? (0, response_1.success)()
                    : (0, response_1.failed)();
            }
            return (0, error_1.BadRequestError)("error when update status");
        }
        case String(order_entity_1.EnumStatusOrder.RETURNED): {
            if (order.status === order_entity_1.EnumStatusOrder.COMPLETED) {
                yield addTimeline(order, EnumTimelineStatus.ORDER_RETURNED);
                yield (0, notification_service_1.addNewNoti)(notification_entity_1.EnumTypeNotify.RETURNED, order.id, order.user.id);
                return (yield orderRepo.update({ id: order.id }, { status: Number(order_entity_1.EnumStatusOrder[status]) })).affected
                    ? (0, response_1.success)()
                    : (0, response_1.failed)();
            }
            return (0, error_1.BadRequestError)("error when update status");
        }
        case String(order_entity_1.EnumStatusOrder.RETURNED_COMPLETED): {
            if (order.status === order_entity_1.EnumStatusOrder.RETURNED) {
                yield addTimeline(order, EnumTimelineStatus.ORDER_RETURNED_COMPLETED);
                yield (0, notification_service_1.addNewNoti)(notification_entity_1.EnumTypeNotify.RETURNED_COMPLETED, order.id, order.user.id);
                order.orderItems.map((e) => __awaiter(void 0, void 0, void 0, function* () {
                    yield (0, inventory_service_1.increaseStock)(e.product_option.id, e.quantity);
                }));
                yield (0, payment_service_1.markAsRefund)(order.payment);
                return (yield orderRepo.update({ id: order.id }, { status: Number(order_entity_1.EnumStatusOrder[status]) })).affected
                    ? (0, response_1.success)()
                    : (0, response_1.failed)();
            }
            return (0, error_1.BadRequestError)("error when update status");
        }
    }
    return;
});
exports.updateStatusOrder = updateStatusOrder;
const updateAddressOrder = (order_id, address) => __awaiter(void 0, void 0, void 0, function* () {
    const orderRepo = database_1.AppDataSource.getRepository(order_entity_1.Order);
    const order = yield orderRepo.findOneBy({ id: order_id });
    if (!address)
        return (0, error_1.BadRequestError)("address empty");
    if (!order)
        return (0, error_1.BadRequestError)("order not found");
    if (order.status === order_entity_1.EnumStatusOrder.PENDING ||
        order.status === order_entity_1.EnumStatusOrder.PROCESSING) {
        return (yield orderRepo.update({ id: order_id }, { address })).affected
            ? (0, response_1.success)()
            : (0, response_1.failed)();
    }
    return (0, error_1.BadRequestError)("you can change address when the order in state PENDING or PROCESSING");
});
exports.updateAddressOrder = updateAddressOrder;
