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
exports.OrderItem = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
const inventoryInboundNote_entity_1 = require("./inventoryInboundNote.entity");
const productOption_entity_1 = require("./productOption.entity");
let OrderItem = class OrderItem {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderItem.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => productOption_entity_1.ProductOption, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({
        name: "product_option_id"
    }),
    __metadata("design:type", productOption_entity_1.ProductOption)
], OrderItem.prototype, "product_option", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.Order, order => order.orderItems, {
        nullable: true,
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({
        name: "order_id"
    }),
    __metadata("design:type", order_entity_1.Order)
], OrderItem.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => inventoryInboundNote_entity_1.InventoryInboundNote, inventory => inventory.orderItems, {
        nullable: true,
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({
        name: "inventory_inbound_note_id"
    }),
    __metadata("design:type", inventoryInboundNote_entity_1.InventoryInboundNote)
], OrderItem.prototype, "inventoryInboundNote", void 0);
OrderItem = __decorate([
    (0, typeorm_1.Entity)("order_items")
], OrderItem);
exports.OrderItem = OrderItem;
