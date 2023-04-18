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
exports.countProduct = exports.getAll = exports.deleteOne = exports.updateOne = exports.create = void 0;
const brandServices = __importStar(require("../services/brand.service"));
const analysServices = __importStar(require("../services/analysis.service"));
const error_1 = require("../utils/error");
const error_2 = __importDefault(require("../middlewares/error"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    const rs = yield brandServices.create({ name, description });
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.create = create;
const updateOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!name && !description)
        return next((0, error_2.default)((0, error_1.BadRequestError)("data empty"), res));
    const rs = yield brandServices.updateOne(Number(id), { name, description });
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.updateOne = updateOne;
const deleteOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rs = yield brandServices.deleteOne(Number(id));
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.deleteOne = deleteOne;
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = req.query;
    const rs = yield brandServices.getAll(search && String(search));
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.getAll = getAll;
const countProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rs = yield analysServices.countProduct();
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.countProduct = countProduct;
