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
exports.deleteCoupon = exports.getAllCoupon = exports.clearCoupon = exports.applyCoupon = exports.create = void 0;
const couponServices = __importStar(require("../services/coupon.service"));
const error_1 = require("../utils/error");
const error_2 = __importDefault(require("../middlewares/error"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { number, length, value, duplicate = 1, start_date, end_date, type } = req.body;
    const rs = yield couponServices.createNew(number, length, value, duplicate, { start_date, end_date }, type);
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.create = create;
const applyCoupon = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, order_id } = req.body;
    const rs = yield couponServices.applyCoupon(code, order_id);
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.applyCoupon = applyCoupon;
const clearCoupon = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { order_id } = req.body;
    const rs = yield couponServices.clearCoupon(order_id);
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.clearCoupon = clearCoupon;
const getAllCoupon = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rs = yield couponServices.getAllCoupon();
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.getAllCoupon = getAllCoupon;
const deleteCoupon = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { coupon_id } = req.params;
    const rs = yield couponServices.deleteCoupon(Number(coupon_id));
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.deleteCoupon = deleteCoupon;
