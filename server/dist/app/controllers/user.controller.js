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
exports.changePassword = exports.deleteAddress = exports.updateAddress = exports.setDefaultAddress = exports.addAddress = exports.deleteOne = exports.updateOne = exports.getOne = exports.createNew = exports.getAll = void 0;
const userServices = __importStar(require("../services/user.service"));
const error_1 = require("../utils/error");
const error_2 = __importDefault(require("../middlewares/error"));
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 10, page = 1 } = req.query;
    const rs = yield userServices.getAll(Number(limit), Number(page));
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.getAll = getAll;
const createNew = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastName, phone } = req.body;
    const rs = yield userServices.create({
        email,
        password,
        firstName,
        lastName,
        phone,
    });
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.createNew = createNew;
const getOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = Number(req.params.id);
    const rs = yield userServices.getOne(user_id);
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.getOne = getOne;
const updateOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastName, phone, role } = req.body;
    const { id } = req.params;
    const rs = yield userServices.updateOne(Number(id), { email, password, firstName, lastName, phone, role });
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.updateOne = updateOne;
const deleteOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rs = yield userServices.deleteOne(Number(id));
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.deleteOne = deleteOne;
const addAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { address } = req.body;
    const rs = yield userServices.addAddress(Number(id), address);
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.addAddress = addAddress;
const setDefaultAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { id_address } = req.body;
    const rs = yield userServices.setDefaultAddress(Number(id), Number(id_address));
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.setDefaultAddress = setDefaultAddress;
const updateAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_address, id_user } = req.params;
    const { address } = req.body;
    const rs = yield userServices.updateAddress(Number(id_user), Number(id_address), address);
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.updateAddress = updateAddress;
const deleteAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_address, id_user } = req.params;
    const rs = yield userServices.deleteAddress(Number(id_user), Number(id_address));
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.deleteAddress = deleteAddress;
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { old_password, new_password } = req.body;
    if (!req.user)
        return next((0, error_2.default)((0, error_1.BadRequestError)("error"), res));
    const rs = yield userServices.changePassword((_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id, old_password, new_password);
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.changePassword = changePassword;
