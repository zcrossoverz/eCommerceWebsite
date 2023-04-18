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
exports.Coupon = exports.EnumTypeCoupon = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
const couponCondition_entity_1 = require("./couponCondition.entity");
var EnumTypeCoupon;
(function (EnumTypeCoupon) {
    EnumTypeCoupon[EnumTypeCoupon["SHIP"] = 0] = "SHIP";
    EnumTypeCoupon[EnumTypeCoupon["PERCENT"] = 1] = "PERCENT";
    EnumTypeCoupon[EnumTypeCoupon["AMOUNT"] = 2] = "AMOUNT";
})(EnumTypeCoupon = exports.EnumTypeCoupon || (exports.EnumTypeCoupon = {}));
let Coupon = class Coupon {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Coupon.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Coupon.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: EnumTypeCoupon
    }),
    __metadata("design:type", Number)
], Coupon.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Coupon.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Coupon.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Coupon.prototype, "end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: true
    }),
    __metadata("design:type", Boolean)
], Coupon.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Coupon.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, order => order.coupon),
    __metadata("design:type", Array)
], Coupon.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => couponCondition_entity_1.CouponCondition, couponCondition => couponCondition.coupon),
    __metadata("design:type", Array)
], Coupon.prototype, "conditions", void 0);
Coupon = __decorate([
    (0, typeorm_1.Entity)("coupons")
], Coupon);
exports.Coupon = Coupon;
