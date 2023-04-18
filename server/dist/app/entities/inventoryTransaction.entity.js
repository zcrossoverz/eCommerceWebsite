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
exports.InventoryTransaction = exports.EnumInventoryTransactionType = void 0;
const typeorm_1 = require("typeorm");
const productOption_entity_1 = require("./productOption.entity");
var EnumInventoryTransactionType;
(function (EnumInventoryTransactionType) {
    EnumInventoryTransactionType[EnumInventoryTransactionType["IN"] = 0] = "IN";
    EnumInventoryTransactionType[EnumInventoryTransactionType["OUT"] = 1] = "OUT";
})(EnumInventoryTransactionType = exports.EnumInventoryTransactionType || (exports.EnumInventoryTransactionType = {}));
let InventoryTransaction = class InventoryTransaction {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InventoryTransaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], InventoryTransaction.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: EnumInventoryTransactionType
    }),
    __metadata("design:type", Number)
], InventoryTransaction.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InventoryTransaction.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "bigint"
    }),
    __metadata("design:type", String)
], InventoryTransaction.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => productOption_entity_1.ProductOption, product_option => product_option.inventory_transactions, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({
        name: "product_option_id"
    }),
    __metadata("design:type", productOption_entity_1.ProductOption)
], InventoryTransaction.prototype, "product_option", void 0);
InventoryTransaction = __decorate([
    (0, typeorm_1.Entity)("inventory_transactions")
], InventoryTransaction);
exports.InventoryTransaction = InventoryTransaction;
