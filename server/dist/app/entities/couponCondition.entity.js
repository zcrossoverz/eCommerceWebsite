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
exports.CouponCondition = exports.EnumTypeCouponCondition = void 0;
const typeorm_1 = require("typeorm");
const coupon_entity_1 = require("./coupon.entity");
var EnumTypeCouponCondition;
(function (EnumTypeCouponCondition) {
    EnumTypeCouponCondition[EnumTypeCouponCondition["ONE_PRODUCT"] = 0] = "ONE_PRODUCT";
    EnumTypeCouponCondition[EnumTypeCouponCondition["MINIMUM_PURCHASE"] = 1] = "MINIMUM_PURCHASE";
    EnumTypeCouponCondition[EnumTypeCouponCondition["BRAND"] = 2] = "BRAND";
    EnumTypeCouponCondition[EnumTypeCouponCondition["FIRST_PURCHASE"] = 3] = "FIRST_PURCHASE";
})(EnumTypeCouponCondition = exports.EnumTypeCouponCondition || (exports.EnumTypeCouponCondition = {}));
let CouponCondition = class CouponCondition {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CouponCondition.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: EnumTypeCouponCondition
    }),
    __metadata("design:type", Number)
], CouponCondition.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CouponCondition.prototype, "condition", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => coupon_entity_1.Coupon, coupon => coupon.conditions),
    (0, typeorm_1.JoinColumn)({
        name: "coupon_id"
    }),
    __metadata("design:type", coupon_entity_1.Coupon)
], CouponCondition.prototype, "coupon", void 0);
CouponCondition = __decorate([
    (0, typeorm_1.Entity)("coupon_condition")
], CouponCondition);
exports.CouponCondition = CouponCondition;
