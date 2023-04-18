"use strict";
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
exports.markAsDone = exports.addRemindFeedback = void 0;
const database_1 = require("../database");
const workQueue_entity_1 = require("../entities/workQueue.entity");
const error_1 = require("../utils/error");
const response_1 = require("../utils/response");
const workRepo = database_1.AppDataSource.getRepository(workQueue_entity_1.WorkQueue);
const addRemindFeedback = (product, user) => __awaiter(void 0, void 0, void 0, function* () {
    return !(yield workRepo.findOneBy({
        product: {
            id: product.id,
        },
        user: {
            id: user.id,
        },
    }))
        ? yield workRepo.save(workRepo.create({
            type: workQueue_entity_1.EnumWorkQueueType.RATE,
            product,
            user,
        }))
        : (0, error_1.BadRequestError)("user already rate this product");
});
exports.addRemindFeedback = addRemindFeedback;
const markAsDone = (product, user, type) => __awaiter(void 0, void 0, void 0, function* () {
    const work = workRepo.findBy({
        product: {
            id: product.id
        },
        user: {
            id: user.id
        }
    });
    const data = (yield work).find(work => work.type === type);
    return (yield workRepo.update({
        id: data === null || data === void 0 ? void 0 : data.id
    }, {
        is_done: true
    })).affected ? (0, response_1.success)() : (0, response_1.failed)();
});
exports.markAsDone = markAsDone;
