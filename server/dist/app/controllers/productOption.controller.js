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
exports.analysisPrices = exports.updatePrice = exports.updateStock = exports.updateOne = exports.deleteOne = exports.create = void 0;
const productOptionServices = __importStar(require("../services/productOption.service"));
const analysisServices = __importStar(require("../services/analysis.service"));
const error_1 = require("../utils/error");
const error_2 = __importDefault(require("../middlewares/error"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { color, ram, rom, price } = req.body;
    const { product_id } = req.params;
    const file = req.file;
    console.log(file);
    if (!file)
        return next((0, error_2.default)((0, error_1.BadRequestError)("image for product is required!"), res));
    const { path } = file;
    const rs = yield productOptionServices.create(Number(product_id), {
        color,
        ram,
        rom,
        price,
    }, path.replace(`public\\`, ``));
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.create = create;
const deleteOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rs = yield productOptionServices.deleteOne(Number(req.params.id));
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.deleteOne = deleteOne;
const updateOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { color, ram, rom, price } = req.body;
    if (!color && !ram && !rom && !price)
        return next((0, error_2.default)((0, error_1.BadRequestError)("data empty"), res));
    const rs = yield productOptionServices.updateOne(Number(req.params.id), {
        color,
        ram,
        rom,
        price,
    });
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.updateOne = updateOne;
const updateStock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { quantity } = req.body;
    const rs = yield productOptionServices.updateStock(Number(id), quantity);
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.updateStock = updateStock;
const updatePrice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { new_price } = req.body;
    const rs = yield productOptionServices.updatePrice(Number(id), new_price);
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.updatePrice = updatePrice;
const analysisPrices = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_option_id } = req.params;
    const rs = yield analysisServices.analysisPrices(Number(product_option_id));
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.analysisPrices = analysisPrices;
