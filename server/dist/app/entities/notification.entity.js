"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = exports.EnumTypeNotify = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
var EnumTypeNotify;
(function (EnumTypeNotify) {
    EnumTypeNotify[EnumTypeNotify["EMPTY"] = 0] = "EMPTY";
    EnumTypeNotify[EnumTypeNotify["NEW_ORDER"] = 1] = "NEW_ORDER";
    EnumTypeNotify[EnumTypeNotify["USER_FEEDBACK"] = 2] = "USER_FEEDBACK";
    EnumTypeNotify[EnumTypeNotify["SHIPPED"] = 3] = "SHIPPED";
    EnumTypeNotify[EnumTypeNotify["COMPLETED"] = 4] = "COMPLETED";
    EnumTypeNotify[EnumTypeNotify["CANCELLED"] = 5] = "CANCELLED";
    EnumTypeNotify[EnumTypeNotify["RETURNED"] = 6] = "RETURNED";
    EnumTypeNotify[EnumTypeNotify["RETURNED_COMPLETED"] = 7] = "RETURNED_COMPLETED";
})(EnumTypeNotify = exports.EnumTypeNotify || (exports.EnumTypeNotify = {}));
let Notification = class Notification {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Notification.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: EnumTypeNotify
    }),
    __metadata("design:type", Number)
], Notification.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        default: false
    }),
    __metadata("design:type", Boolean)
], Notification.prototype, "is_read", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.notifications, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({
        name: "user_id"
    }),
    __metadata("design:type", user_entity_1.User)
], Notification.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Notification.prototype, "time", void 0);
Notification = __decorate([
    (0, typeorm_1.Entity)("notifications")
], Notification);
exports.Notification = Notification;
