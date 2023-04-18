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
exports.hoanghamb = exports.canRate = exports.addImages = exports.deleteOne = exports.update = exports.getOneById = exports.create = exports.getAll = void 0;
const productServices = __importStar(require("../services/product.service"));
const error_1 = __importDefault(require("../middlewares/error"));
const error_2 = require("../utils/error");
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 10, page = 1, brand_id, price_min, price_max, rate, search, order = "newest", } = req.query;
    if (!brand_id && !price_max && !price_min && !rate) {
        const rs = yield productServices.getAll(Number(limit), Number(page), null, search && String(search), String(order));
        return (0, error_2.isError)(rs) ? next((0, error_1.default)(rs, res)) : res.json(rs);
    }
    else {
        const rs = yield productServices.getAll(Number(limit), Number(page), {
            brand_id: brand_id ? Number(brand_id) : undefined,
            price: {
                min: price_min ? Number(price_min) : undefined,
                max: price_max ? Number(price_max) : undefined,
            },
            rate: rate ? Number(rate) : undefined,
        }, search && String(search), String(order));
        return (0, error_2.isError)(rs) ? next((0, error_1.default)(rs, res)) : res.json(rs);
    }
});
exports.getAll = getAll;
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, ram, rom, color, price, brand_id } = req.body;
    const file = req.file;
    if (!file)
        return next((0, error_1.default)((0, error_2.BadRequestError)("image for product is required!"), res));
    const { path } = file;
    const rs = yield productServices.create({ name, description }, { ram, rom, color, price }, path.replace(`public\\`, ""), brand_id);
    return (0, error_2.isError)(rs) ? next((0, error_1.default)(rs, res)) : res.json(rs);
});
exports.create = create;
const getOneById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rs = yield productServices.getOneById(Number(id));
    return (0, error_2.isError)(rs) ? next((0, error_1.default)(rs, res)) : res.json(rs);
});
exports.getOneById = getOneById;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, brand_id = -1 } = req.body;
    const rs = yield productServices.update(Number(id), { name, description }, brand_id);
    return (0, error_2.isError)(rs) ? next((0, error_1.default)(rs, res)) : res.json(rs);
});
exports.update = update;
const deleteOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rs = yield productServices.deleteOne(Number(id));
    return (0, error_2.isError)(rs) ? next((0, error_1.default)(rs, res)) : res.json(rs);
});
exports.deleteOne = deleteOne;
const addImages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const files = req.files;
    const rs = yield productServices.addImages(Number(id), files.map((e) => e.path.replace("public\\", "")));
    return (0, error_2.isError)(rs) ? next((0, error_1.default)(rs, res)) : res.json(rs);
});
exports.addImages = addImages;
const canRate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return next((0, error_1.default)((0, error_2.BadRequestError)("error"), res));
    const { product_id } = req.params;
    const rs = yield productServices.canRate(Number(product_id), req.user.user_id);
    return (0, error_2.isError)(rs) ? next((0, error_1.default)(rs, res)) : res.json(rs);
});
exports.canRate = canRate;
const hoanghamb = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url)
        return next((0, error_1.default)((0, error_2.BadRequestError)("url empty"), res));
    const r = yield axios_1.default.get('https://hoanghamobile.com//dien-thoai-di-dong/samsung-galaxy-a53-chinh-hang');
    const root = cheerio.load(r.data);
    const images = root('#imagePreview img').html();
    console.log(images);
    return res.json({ a: 1 });
});
exports.hoanghamb = hoanghamb;
