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
exports.getAllNoti = exports.getUnreadNoti = exports.addNewNoti = void 0;
const notificationServices = __importStar(require("../services/notification.service"));
const error_1 = __importDefault(require("../middlewares/error"));
const error_2 = require("../utils/error");
const addNewNoti = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, id, user_id } = req.body;
    const rs = yield notificationServices.addNewNoti(type, id, Number(user_id));
    return (0, error_2.isError)(rs) ? next((0, error_1.default)(rs, res)) : res.json(rs);
});
exports.addNewNoti = addNewNoti;
const getUnreadNoti = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    const rs = yield notificationServices.getNoti(Number(user_id), notificationServices.getType.UNREAD);
    return (0, error_2.isError)(rs) ? next((0, error_1.default)(rs, res)) : res.json(rs);
});
exports.getUnreadNoti = getUnreadNoti;
const getAllNoti = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    const rs = yield notificationServices.getNoti(Number(user_id), notificationServices.getType.ALL);
    return (0, error_2.isError)(rs) ? next((0, error_1.default)(rs, res)) : res.json(rs);
});
exports.getAllNoti = getAllNoti;
