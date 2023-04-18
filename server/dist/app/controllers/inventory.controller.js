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
exports.analysis = exports.getAllInboundNote = exports.deleteInboundNote = exports.processInboundNote = exports.getInboundNote = exports.createInboundNote = exports.decreaseStock = exports.increaseStock = void 0;
const inventoryServices = __importStar(require("../services/inventory.service"));
const analysServices = __importStar(require("../services/analysis.service"));
const error_1 = require("../utils/error");
const error_2 = __importDefault(require("../middlewares/error"));
const increaseStock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_option_id } = req.params;
    const { quantity } = req.body;
    const rs = yield inventoryServices.increaseStock(Number(product_option_id), quantity);
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.increaseStock = increaseStock;
const decreaseStock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_option_id } = req.params;
    const { quantity } = req.body;
    const rs = yield inventoryServices.decreaseStock(Number(product_option_id), quantity);
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.decreaseStock = decreaseStock;
const createInboundNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    const rs = yield inventoryServices.createWarehouseInboundNote(data);
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.createInboundNote = createInboundNote;
const getInboundNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rs = yield inventoryServices.getInboundNote(Number(id));
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.getInboundNote = getInboundNote;
const processInboundNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { accept } = req.body;
    const rs = yield inventoryServices.processInboundNote(Number(id), accept);
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.processInboundNote = processInboundNote;
const deleteInboundNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rs = yield inventoryServices.deleteInboundNote(Number(id));
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.deleteInboundNote = deleteInboundNote;
const getAllInboundNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 10, page = 1 } = req.query;
    const rs = yield inventoryServices.getAllInboundNote(Number(limit), Number(page));
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.getAllInboundNote = getAllInboundNote;
const analysis = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 10, page = 1, query } = req.query;
    const rs = yield analysServices.productInWarehouse(Number(limit), Number(page), query !== undefined ? String(query) : undefined);
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.analysis = analysis;
