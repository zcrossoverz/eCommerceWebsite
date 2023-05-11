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
exports.getNoti = exports.getType = exports.addNewNoti = void 0;
const database_1 = require("../database");
const notification_entity_1 = require("../entities/notification.entity");
const order_entity_1 = require("../entities/order.entity");
const user_entity_1 = require("../entities/user.entity");
const error_1 = require("../utils/error");
const response_1 = require("../utils/response");
const notiRepo = database_1.AppDataSource.getRepository(notification_entity_1.Notification);
const orderRepo = database_1.AppDataSource.getRepository(order_entity_1.Order);
const userRepo = database_1.AppDataSource.getRepository(user_entity_1.User);
const generateContent = (type, id) => __awaiter(void 0, void 0, void 0, function* () {
    switch (Number(type)) {
        case notification_entity_1.EnumTypeNotify.NEW_ORDER: {
            const order = yield orderRepo.findOneBy({ id });
            return `Cám ơn bạn đã đặt hàng, mã đơn hàng của bạn là #${order === null || order === void 0 ? void 0 : order.id}. Chúng tôi sẽ xử lý sớm nhất có thể.`;
        }
        case notification_entity_1.EnumTypeNotify.SHIPPED: {
            const order = yield orderRepo.findOneBy({ id });
            return `Đơn hàng #${order === null || order === void 0 ? void 0 : order.id} của bạn đã được bàn giao cho đơn vị vận chuyển.`;
        }
        case notification_entity_1.EnumTypeNotify.COMPLETED: {
            const order = yield orderRepo.findOneBy({ id });
            return `Đơn hàng #${order === null || order === void 0 ? void 0 : order.id} đã được giao thành công, hãy để lại đánh giá nào.`;
        }
        case notification_entity_1.EnumTypeNotify.CANCELLED: {
            const order = yield orderRepo.findOneBy({ id });
            return `Chúng tôi đã hủy đơn hàng #${order === null || order === void 0 ? void 0 : order.id} của bạn.`;
        }
        case notification_entity_1.EnumTypeNotify.RETURNED: {
            const order = yield orderRepo.findOneBy({ id });
            return `Chúng tôi đã tiếp nhận yêu cầu trả hàng cho đơn hàng #${order === null || order === void 0 ? void 0 : order.id} của bạn. Yêu cầu sẽ được xử lý trong thời gian sớm nhất.`;
        }
        case notification_entity_1.EnumTypeNotify.RETURNED_COMPLETED: {
            const order = yield orderRepo.findOneBy({ id });
            return `Đơn hàng #${order === null || order === void 0 ? void 0 : order.id} của bạn đã được trả hàng thành công.`;
        }
    }
    return;
});
const addNewNoti = (type, id, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!type)
        return (0, error_1.BadRequestError)("type empty");
    if (!(type in notification_entity_1.EnumTypeNotify))
        return (0, error_1.BadRequestError)("type not valid");
    const user = yield userRepo.findOneBy({ id: user_id });
    if (!user)
        return (0, error_1.BadRequestError)("user not found");
    const new_noti = yield notiRepo.save(notiRepo.create({
        type,
        content: yield generateContent(type, id),
        user: user,
    }));
    const unread = user.unread_message + 1;
    yield userRepo.update({ id: user.id }, { unread_message: unread });
    return new_noti;
});
exports.addNewNoti = addNewNoti;
var getType;
(function (getType) {
    getType[getType["UNREAD"] = 0] = "UNREAD";
    getType[getType["ALL"] = 1] = "ALL";
})(getType = exports.getType || (exports.getType = {}));
const getNoti = (user_id, type) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepo.findOne({
        relations: {
            notifications: true,
        },
        where: { id: user_id },
    });
    if (!user)
        return (0, error_1.BadRequestError)("user not found");
    if (type) {
        const noti = [];
        yield Promise.all(user.notifications.map((e) => __awaiter(void 0, void 0, void 0, function* () {
            noti.push(e);
            if (!e.is_read)
                return yield markAsRead(e);
            return;
        })));
        yield userRepo.update({
            id: user_id
        }, {
            unread_message: 0
        });
        return {
            data: noti.map((e) => e),
        };
    }
    else {
        const noti = [];
        yield Promise.all(user.notifications.map((e) => __awaiter(void 0, void 0, void 0, function* () {
            if (e.is_read)
                return;
            noti.push(e);
            return yield markAsRead(e);
        })));
        yield userRepo.update({
            id: user_id
        }, {
            unread_message: 0
        });
        return {
            data: noti.map((e) => e),
        };
    }
});
exports.getNoti = getNoti;
const markAsRead = (noti) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield notiRepo.update({ id: noti.id }, { is_read: true })).affected
        ? (0, response_1.success)()
        : (0, response_1.failed)();
});
