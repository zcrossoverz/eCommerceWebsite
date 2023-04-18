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
exports.Order = exports.EnumStatusOrder = void 0;
const typeorm_1 = require("typeorm");
const coupon_entity_1 = require("./coupon.entity");
const user_entity_1 = require("./user.entity");
const orderItem_entity_1 = require("./orderItem.entity");
const timeline_entity_1 = require("./timeline.entity");
const payment_entity_1 = require("./payment.entity");
var EnumStatusOrder;
(function (EnumStatusOrder) {
    EnumStatusOrder[EnumStatusOrder["PENDING"] = 0] = "PENDING";
    EnumStatusOrder[EnumStatusOrder["PROCESSING"] = 1] = "PROCESSING";
    EnumStatusOrder[EnumStatusOrder["SHIPPED"] = 2] = "SHIPPED";
    EnumStatusOrder[EnumStatusOrder["COMPLETED"] = 3] = "COMPLETED";
    EnumStatusOrder[EnumStatusOrder["CANCELLED"] = 4] = "CANCELLED";
    EnumStatusOrder[EnumStatusOrder["RETURNED"] = 5] = "RETURNED";
    EnumStatusOrder[EnumStatusOrder["RETURNED_COMPLETED"] = 6] = "RETURNED_COMPLETED";
})(EnumStatusOrder = exports.EnumStatusOrder || (exports.EnumStatusOrder = {}));
let Order = class Order {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: EnumStatusOrder,
        default: EnumStatusOrder.PENDING
    }),
    __metadata("design:type", Number)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], Order.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", String)
], Order.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Order.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.orders, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({
        name: "user_id"
    }),
    __metadata("design:type", user_entity_1.User)
], Order.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderItem_entity_1.OrderItem, orderItem => orderItem.order),
    __metadata("design:type", Array)
], Order.prototype, "orderItems", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => coupon_entity_1.Coupon, coupon => coupon.orders, { nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({
        name: "coupon_id",
    }),
    __metadata("design:type", Object)
], Order.prototype, "coupon", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => timeline_entity_1.Timeline, timeline => timeline.order),
    __metadata("design:type", Array)
], Order.prototype, "timeline", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => payment_entity_1.Payment, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({
        name: "payment_id"
    }),
    __metadata("design:type", payment_entity_1.Payment)
], Order.prototype, "payment", void 0);
Order = __decorate([
    (0, typeorm_1.Entity)("orders")
], Order);
exports.Order = Order;
