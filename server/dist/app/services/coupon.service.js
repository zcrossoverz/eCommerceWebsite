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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCoupon = exports.getAllCoupon = exports.clearCoupon = exports.applyCoupon = exports.createNew = void 0;
const typeorm_1 = require("typeorm");
const database_1 = require("../database");
const coupon_entity_1 = require("../entities/coupon.entity");
const order_entity_1 = require("../entities/order.entity");
const payment_entity_1 = require("../entities/payment.entity");
const error_1 = require("../utils/error");
const response_1 = require("../utils/response");
const generateCode = (length) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
};
const couponRepo = database_1.AppDataSource.getRepository(coupon_entity_1.Coupon);
const orderRepo = database_1.AppDataSource.getRepository(order_entity_1.Order);
const paymentRepo = database_1.AppDataSource.getRepository(payment_entity_1.Payment);
const createNew = (number, length, value, duplicate, expired, type) => __awaiter(void 0, void 0, void 0, function* () {
    const coupons = [];
    for (let i = 0; i < duplicate; i++) {
        const code = generateCode(length);
        coupons.push(Object.assign({ code, type: Number(coupon_entity_1.EnumTypeCoupon[type]), value,
            number }, expired));
    }
    const result = [];
    yield Promise.all(coupons.map((coupon) => __awaiter(void 0, void 0, void 0, function* () {
        result.push(Object.assign({}, (yield couponRepo.save(couponRepo.create(Object.assign({}, coupon))))));
    })));
    return result;
});
exports.createNew = createNew;
const checkCoupon = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const coupon = yield couponRepo.findOne({
        where: {
            code,
        },
    });
    if (!coupon)
        return (0, error_1.BadRequestError)("coupon not found", 404);
    if (!coupon.active)
        return (0, error_1.BadRequestError)("coupon not active");
    if (!coupon.number)
        return (0, error_1.BadRequestError)("coupon out of quantity");
    const start_date = new Date(coupon.start_date).getTime();
    const end_date = new Date(coupon.end_date).getTime();
    const now = new Date().getTime();
    if (start_date > now || end_date < now)
        return (0, error_1.BadRequestError)("you cannot apply coupon now");
    return coupon;
});
const applyCoupon = (code, order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const coupon = yield checkCoupon(code);
    if ((0, error_1.isError)(coupon))
        return coupon;
    const order = yield orderRepo.findOne({
        where: {
            id: order_id,
        },
        relations: {
            payment: true,
            coupon: true,
        },
    });
    if (!order || !order_id)
        return (0, error_1.BadRequestError)("order not found", 404);
    if (order.status !== order_entity_1.EnumStatusOrder.PENDING)
        return (0, error_1.BadRequestError)("order alrealdy paid");
    if (order.coupon)
        return (0, error_1.BadRequestError)("order alrealdy apply coupon");
    const payment = yield paymentRepo.findOne({
        where: {
            id: order.payment.id,
        },
    });
    if (!payment)
        return (0, error_1.BadRequestError)("error when retrieve payment");
    if (payment.is_paid)
        return (0, error_1.BadRequestError)("payment already paid");
    switch (coupon.type) {
        case coupon_entity_1.EnumTypeCoupon.AMOUNT: {
            const value = Number(payment.amount) - coupon.value >= 0
                ? Number(payment.amount) - coupon.value
                : 0;
            const status = (yield paymentRepo.update({
                id: payment.id,
            }, { amount: `${value}` })).affected;
            if (status) {
                yield orderRepo.update({ id: order_id }, { coupon });
                yield couponRepo.update({ id: coupon.id }, { number: coupon.number - 1 });
            }
            return status ? (0, response_1.success)() : (0, response_1.failed)();
        }
        case coupon_entity_1.EnumTypeCoupon.PERCENT: {
            const value = Number(payment.amount) -
                (Number(payment.amount) / 100) * coupon.value >=
                0
                ? Number(payment.amount) -
                    (Number(payment.amount) / 100) * coupon.value
                : 0;
            const status = (yield paymentRepo.update({
                id: payment.id,
            }, { amount: `${value}` })).affected;
            if (status) {
                yield orderRepo.update({ id: order_id }, { coupon });
                yield couponRepo.update({ id: coupon.id }, { number: coupon.number - 1 });
            }
            return status ? (0, response_1.success)() : (0, response_1.failed)();
        }
        default:
            return;
    }
});
exports.applyCoupon = applyCoupon;
const clearCoupon = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderRepo.findOne({
        where: {
            id: order_id,
        },
        relations: {
            payment: true,
            coupon: true,
        },
    });
    if (!order || !order_id)
        return (0, error_1.BadRequestError)("order not found", 404);
    if (order.status !== order_entity_1.EnumStatusOrder.PENDING)
        return (0, error_1.BadRequestError)("order alrealdy paid");
    if (!order.coupon)
        return (0, error_1.BadRequestError)("order not apply coupon yet");
    const payment = yield paymentRepo.findOne({
        where: {
            id: order.payment.id,
        },
    });
    const coupon = yield couponRepo.findOne({
        where: {
            id: order.coupon.id,
        },
    });
    if (!coupon)
        return (0, error_1.BadRequestError)("cannot retrieve coupon");
    if (!payment)
        return (0, error_1.BadRequestError)("error when retrieve payment");
    if (payment.is_paid)
        return (0, error_1.BadRequestError)("payment already paid");
    switch (coupon.type) {
        case coupon_entity_1.EnumTypeCoupon.AMOUNT: {
            const value = Number(payment.amount) + coupon.value;
            const status = (yield paymentRepo.update({
                id: payment.id,
            }, { amount: `${value}` })).affected;
            if (status) {
                yield orderRepo.update({ id: order_id }, { coupon: null });
                yield couponRepo.update({ id: coupon.id }, { number: coupon.number + 1 });
            }
            return status ? (0, response_1.success)() : (0, response_1.failed)();
        }
        case coupon_entity_1.EnumTypeCoupon.PERCENT: {
            const value = (Number(payment.amount) / (100 - coupon.value)) * 100;
            const status = (yield paymentRepo.update({
                id: payment.id,
            }, { amount: `${value}` })).affected;
            if (status) {
                yield orderRepo.update({ id: order_id }, { coupon: null });
                yield couponRepo.update({ id: coupon.id }, { number: coupon.number + 1 });
            }
            return status ? (0, response_1.success)() : (0, response_1.failed)();
        }
        default:
            return;
    }
});
exports.clearCoupon = clearCoupon;
const getAllCoupon = () => __awaiter(void 0, void 0, void 0, function* () {
    return (yield couponRepo.find({
        where: {
            number: (0, typeorm_1.MoreThan)(0),
        },
    }))
        .filter((coupon) => {
        const start_date = new Date(coupon.start_date).getTime();
        const end_date = new Date(coupon.end_date).getTime();
        const now = new Date().getTime();
        return start_date > now || end_date < now ? false : true;
    })
        .map((e) => {
        const start_d = e.start_date.split("/");
        const end_d = e.end_date.split("/");
        return Object.assign(Object.assign({}, e), { type: coupon_entity_1.EnumTypeCoupon[e.type], start_date: `${start_d[1]}/${start_d[0]}/${start_d[2]}`, end_date: `${end_d[1]}/${end_d[0]}/${end_d[2]}` });
    });
});
exports.getAllCoupon = getAllCoupon;
const deleteCoupon = (coupon_id) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield couponRepo.delete({ id: coupon_id })).affected ? (0, response_1.success)() : (0, response_1.failed)();
});
exports.deleteCoupon = deleteCoupon;
