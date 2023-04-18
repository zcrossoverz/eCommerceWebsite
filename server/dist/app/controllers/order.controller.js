"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.top_sale = exports.updateAddressOrder = exports.getStatusOrder = exports.updateStatusOrder = exports.deleteOrder = exports.getAllOrderByUser = exports.getAllOrder = exports.getOneOrder = exports.createOrder = void 0;
const orderServices = __importStar(require("../services/order.service"));
const analysServices = __importStar(require("../services/analysis.service"));
const error_1 = require("../utils/error");
const error_2 = __importDefault(require("../middlewares/error"));
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, items, address = null } = req.body;
    const rs = yield orderServices.createOrder(Number(user_id), items, address);
    if (orderServices.instanceOfErrorInfo(rs))
        return res.status(500).json({
            type: rs.type,
            product_option_id: rs.product_option_id
        });
    if ((0, error_1.isError)(rs))
        return next((0, error_2.default)(rs, res));
    return res.json(rs);
});
exports.createOrder = createOrder;
const getOneOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { order_id } = req.params;
    const rs = yield orderServices.getOneOrder(Number(order_id));
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.getOneOrder = getOneOrder;
const getAllOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 10, page = 1, order = 'newest', status = -1, method = -1, paid = -1, search = '' } = req.query;
    const rs = yield orderServices.getAllOrder(Number(limit), Number(page), String(order), Number(status), Number(method), Number(paid), String(search));
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.getAllOrder = getAllOrder;
const getAllOrderByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 10, page = 1, user_id = 0 } = req.query;
    const rs = yield orderServices.getAllOrderByUser(Number(user_id), Number(limit), Number(page));
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.getAllOrderByUser = getAllOrderByUser;
const deleteOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { order_id } = req.params;
    const rs = yield orderServices.deleteOrder(Number(order_id));
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.deleteOrder = deleteOrder;
const updateStatusOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { order_id } = req.params;
    const { status } = req.body;
    const rs = yield orderServices.updateStatusOrder(Number(order_id), status);
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.updateStatusOrder = updateStatusOrder;
const getStatusOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { order_id } = req.params;
    const order = yield orderServices.getOneOrder(Number(order_id));
    if ((0, error_1.isError)(order))
        return next((0, error_2.default)(order, res));
    return res.json({
        status: order.status,
        payment: order.payment.method,
        is_paid: order.payment.is_paid,
    });
});
exports.getStatusOrder = getStatusOrder;
const updateAddressOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { order_id } = req.params;
    const { address } = req.body;
    const rs = yield orderServices.updateAddressOrder(Number(order_id), address);
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.updateAddressOrder = updateAddressOrder;
const top_sale = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rs = yield analysServices.top_sale();
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.top_sale = top_sale;
