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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePaypalAccessToken = exports.markAsRefund = exports.markAsPaid = exports.updateStatus = exports.selectMethod = void 0;
const axios_1 = __importDefault(require("axios"));
const database_1 = require("../database");
const order_entity_1 = require("../entities/order.entity");
const payment_entity_1 = require("../entities/payment.entity");
const error_1 = require("../utils/error");
const response_1 = require("../utils/response");
const qs_1 = __importDefault(require("qs"));
const paypal_rest_sdk_1 = __importDefault(require("paypal-rest-sdk"));
const orderRepo = database_1.AppDataSource.getRepository(order_entity_1.Order);
const paymentRepo = database_1.AppDataSource.getRepository(payment_entity_1.Payment);
const selectMethod = (order_id, method) => __awaiter(void 0, void 0, void 0, function* () {
    if (!method)
        return (0, error_1.BadRequestError)("method not select");
    const order = yield orderRepo.findOne({
        where: { id: order_id },
        relations: {
            payment: true,
        },
    });
    if (!order)
        return (0, error_1.BadRequestError)("order not found");
    const payment = yield paymentRepo.findOneBy({ id: order.payment.id });
    if (!payment)
        return (0, error_1.BadRequestError)("payment data error");
    return (yield paymentRepo.update({ id: order.payment.id }, { method: Number(payment_entity_1.EnumPaymentMethod[method]) }))
        ? (0, response_1.success)()
        : (0, response_1.failed)();
});
exports.selectMethod = selectMethod;
const updateStatus = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderRepo.findOne({
        where: {
            id: order_id,
        },
        relations: {
            payment: true,
        },
    });
    if (!order)
        return (0, error_1.BadRequestError)("order not found");
    if (order.status !== order_entity_1.EnumStatusOrder.PENDING)
        return (0, error_1.BadRequestError)("payment error");
    return yield (0, exports.markAsPaid)(order.payment);
});
exports.updateStatus = updateStatus;
const markAsPaid = (payment) => __awaiter(void 0, void 0, void 0, function* () {
    return !payment.is_paid &&
        (yield paymentRepo.update({ id: payment.id }, { is_paid: true })).affected
        ? (0, response_1.success)()
        : response_1.failed;
});
exports.markAsPaid = markAsPaid;
const markAsRefund = (payment) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield paymentRepo.update({ id: payment.id }, { is_paid: false, method: payment_entity_1.EnumPaymentMethod.RETURNED })).affected
        ? (0, response_1.success)()
        : (0, response_1.failed)();
});
exports.markAsRefund = markAsRefund;
const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;
const environment = process.env.ENVIRONMENT || "sandbox";
paypal_rest_sdk_1.default.configure({
    mode: environment,
    client_id: `${PAYPAL_CLIENT_ID}`,
    client_secret: `${PAYPAL_APP_SECRET}`,
});
const generatePaypalAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`).toString("base64");
    try {
        const data = qs_1.default.stringify({
            grant_type: "client_credentials",
        });
        const res = yield (0, axios_1.default)({
            method: "post",
            url: `/v1/oauth2/token`,
            data,
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });
        return res.data.access_token;
    }
    catch (error) {
        const err = error;
        return (0, error_1.BadRequestError)(`${(_a = err.response) === null || _a === void 0 ? void 0 : _a.statusText}: ${err.message}`, (_b = err.response) === null || _b === void 0 ? void 0 : _b.status);
    }
});
exports.generatePaypalAccessToken = generatePaypalAccessToken;
