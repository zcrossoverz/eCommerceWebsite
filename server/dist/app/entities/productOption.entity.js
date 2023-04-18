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
exports.ProductOption = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const price_entity_1 = require("./price.entity");
const warehouse_entity_1 = require("./warehouse.entity");
const inventoryTransaction_entity_1 = require("./inventoryTransaction.entity");
const image_entity_1 = require("./image.entity");
let ProductOption = class ProductOption {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductOption.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductOption.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductOption.prototype, "ram", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductOption.prototype, "rom", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, product => product.productOptions, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({
        name: "product_id"
    }),
    __metadata("design:type", product_entity_1.Product)
], ProductOption.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => price_entity_1.Price, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "price_id" }),
    __metadata("design:type", price_entity_1.Price)
], ProductOption.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => warehouse_entity_1.Warehouse, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "warehouse_id" }),
    __metadata("design:type", warehouse_entity_1.Warehouse)
], ProductOption.prototype, "warehouse", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inventoryTransaction_entity_1.InventoryTransaction, inventorytrans => inventorytrans.product_option),
    __metadata("design:type", Array)
], ProductOption.prototype, "inventory_transactions", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => image_entity_1.Image, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "image" }),
    __metadata("design:type", image_entity_1.Image)
], ProductOption.prototype, "image", void 0);
ProductOption = __decorate([
    (0, typeorm_1.Entity)("product_options")
], ProductOption);
exports.ProductOption = ProductOption;
