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
exports.PriceHistory = void 0;
const typeorm_1 = require("typeorm");
const price_entity_1 = require("./price.entity");
let PriceHistory = class PriceHistory {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PriceHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "bigint"
    }),
    __metadata("design:type", Number)
], PriceHistory.prototype, "old_price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "bigint"
    }),
    __metadata("design:type", Number)
], PriceHistory.prototype, "new_price", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], PriceHistory.prototype, "update_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => price_entity_1.Price, (price) => price.priceHistories),
    (0, typeorm_1.JoinColumn)({
        name: "price_id"
    }),
    __metadata("design:type", price_entity_1.Price)
], PriceHistory.prototype, "price", void 0);
PriceHistory = __decorate([
    (0, typeorm_1.Entity)("price_history")
], PriceHistory);
exports.PriceHistory = PriceHistory;
