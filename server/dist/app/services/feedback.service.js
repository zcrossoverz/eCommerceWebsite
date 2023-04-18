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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFeedback = exports.syncRate = exports.getFeedbackByProduct = exports.deleteFeedback = exports.updateFeedback = exports.createFeedback = void 0;
const database_1 = require("../database");
const feedback_entity_1 = require("../entities/feedback.entity");
const product_entity_1 = require("../entities/product.entity");
const user_entity_1 = require("../entities/user.entity");
const error_1 = require("../utils/error");
const response_1 = require("../utils/response");
const workQueueServices = __importStar(require("../services/workqueue.service"));
const workQueue_entity_1 = require("../entities/workQueue.entity");
const product_service_1 = require("./product.service");
const feedbackRepo = database_1.AppDataSource.getRepository(feedback_entity_1.Feedback);
const userRepo = database_1.AppDataSource.getRepository(user_entity_1.User);
const productRepo = database_1.AppDataSource.getRepository(product_entity_1.Product);
const createFeedback = (product_id, user_id, rate, comment = null) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productRepo.findOneBy({ id: product_id });
    const user = yield userRepo.findOneBy({ id: user_id });
    if (!product)
        return (0, error_1.BadRequestError)("product not found");
    if (!user)
        return (0, error_1.BadRequestError)("user not found");
    const can_rate = yield (0, product_service_1.canRate)(product_id, user_id);
    if (!can_rate.can_rate || can_rate.is_done)
        return (0, error_1.BadRequestError)("you cannot rate this product");
    yield workQueueServices.markAsDone(product, user, workQueue_entity_1.EnumWorkQueueType.RATE);
    const rs = yield feedbackRepo.save(feedbackRepo.create({
        rate: rate,
        comment: comment ? comment : "",
        product,
        user,
    }));
    yield (0, exports.syncRate)(product_id);
    return rs;
});
exports.createFeedback = createFeedback;
const updateFeedback = (product_id, user_id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const can_rate = yield (0, product_service_1.canRate)(product_id, user_id);
    if (can_rate.can_rate && can_rate.is_done) {
        const feedback = yield feedbackRepo.findOneBy({
            product: {
                id: product_id,
            },
            user: {
                id: user_id,
            },
        });
        if (!feedback)
            return (0, error_1.BadRequestError)("feedback not found");
        if (!data.comment && !data.rate)
            return (0, error_1.BadRequestError)("rate and comment empty");
        const rs = (yield feedbackRepo.update({ id: feedback.id }, Object.assign({}, data)))
            .affected
            ? (0, response_1.success)()
            : (0, response_1.failed)();
        yield (0, exports.syncRate)(product_id);
        return rs;
    }
    return (0, error_1.BadRequestError)("you cannot update rate for this product");
});
exports.updateFeedback = updateFeedback;
const deleteFeedback = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield feedbackRepo.findOne({
        where: {
            id,
        },
        relations: {
            product: true,
        },
    });
    const rs = (yield feedbackRepo.delete({ id })).affected
        ? (0, response_1.success)()
        : (0, response_1.failed)();
    if (product)
        yield (0, exports.syncRate)(product.id);
    return rs;
});
exports.deleteFeedback = deleteFeedback;
const getFeedbackByProduct = (product_id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productRepo.findOne({
        where: {
            id: product_id,
        },
        relations: {
            feedbacks: {
                user: true,
            },
        },
    });
    if (!product)
        return (0, error_1.BadRequestError)("product not found");
    const feedbacks = product.feedbacks;
    return feedbacks.length
        ? {
            rate: Math.ceil(feedbacks.reduce((acc, cur) => acc + cur.rate, 0) / feedbacks.length),
            data: feedbacks.map((e) => {
                return Object.assign({}, e);
            }),
        }
        : {
            rate: 0,
            data: [],
        };
});
exports.getFeedbackByProduct = getFeedbackByProduct;
const syncRate = (product_id) => __awaiter(void 0, void 0, void 0, function* () {
    const feedbacks = yield (0, exports.getFeedbackByProduct)(product_id);
    return (yield productRepo.update({ id: product_id }, { rate: (0, error_1.isError)(feedbacks) ? "0" : `${Number(feedbacks.rate)}` })).affected
        ? (0, response_1.success)()
        : (0, response_1.failed)();
});
exports.syncRate = syncRate;
const getAllFeedback = () => __awaiter(void 0, void 0, void 0, function* () {
    const feedback = yield feedbackRepo.find({
        order: {
            id: 'DESC'
        },
        take: 5,
        relations: {
            user: true,
            product: true
        }
    });
    return feedback.length ? feedback : [];
});
exports.getAllFeedback = getAllFeedback;
