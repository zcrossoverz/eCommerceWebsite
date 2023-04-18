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
exports.Payment = exports.EnumPaymentMethod = void 0;
const typeorm_1 = require("typeorm");
var EnumPaymentMethod;
(function (EnumPaymentMethod) {
    EnumPaymentMethod[EnumPaymentMethod["CASH_ON_DELIVERY"] = 0] = "CASH_ON_DELIVERY";
    EnumPaymentMethod[EnumPaymentMethod["PAYPAL"] = 1] = "PAYPAL";
    EnumPaymentMethod[EnumPaymentMethod["NOT_SET"] = 2] = "NOT_SET";
    EnumPaymentMethod[EnumPaymentMethod["RETURNED"] = 3] = "RETURNED";
})(EnumPaymentMethod = exports.EnumPaymentMethod || (exports.EnumPaymentMethod = {}));
let Payment = class Payment {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Payment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: EnumPaymentMethod,
        default: EnumPaymentMethod.NOT_SET
    }),
    __metadata("design:type", Number)
], Payment.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Payment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        default: false
    }),
    __metadata("design:type", Boolean)
], Payment.prototype, "is_paid", void 0);
Payment = __decorate([
    (0, typeorm_1.Entity)("payments")
], Payment);
exports.Payment = Payment;
