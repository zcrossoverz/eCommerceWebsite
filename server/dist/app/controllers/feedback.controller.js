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
exports.getAllFeedback = exports.getFeedbackByProduct = exports.deleteFeedback = exports.updateFeedback = exports.createFeedback = void 0;
const feedbackServices = __importStar(require("../services/feedback.service"));
const error_1 = require("../utils/error");
const error_2 = __importDefault(require("../middlewares/error"));
const createFeedback = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, product_id, rate, comment } = req.body;
    if (!user_id || !product_id)
        return next((0, error_2.default)((0, error_1.BadRequestError)("product or user id not found"), res));
    if (!rate)
        return next((0, error_2.default)((0, error_1.BadRequestError)("rate cannot empty"), res));
    const rs = yield feedbackServices.createFeedback(Number(product_id), Number(user_id), Number(rate), comment && comment);
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.createFeedback = createFeedback;
const updateFeedback = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { product_id } = req.params;
    const { rate, comment } = req.body;
    const rs = yield feedbackServices.updateFeedback(Number(product_id), Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id), { rate, comment });
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.updateFeedback = updateFeedback;
const deleteFeedback = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { feedback_id } = req.params;
    const rs = yield feedbackServices.deleteFeedback(Number(feedback_id));
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.deleteFeedback = deleteFeedback;
const getFeedbackByProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id } = req.params;
    const rs = yield feedbackServices.getFeedbackByProduct(Number(product_id));
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.getFeedbackByProduct = getFeedbackByProduct;
const getAllFeedback = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rs = yield feedbackServices.getAllFeedback();
    return (0, error_1.isError)(rs) ? next((0, error_2.default)(rs, res)) : res.json(rs);
});
exports.getAllFeedback = getAllFeedback;
