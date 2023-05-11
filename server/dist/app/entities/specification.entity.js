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
exports.Specification = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
let Specification = class Specification {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Specification.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Specification.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Specification.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, product => product.specifications, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({
        name: "product_id"
    }),
    __metadata("design:type", product_entity_1.Product)
], Specification.prototype, "product", void 0);
Specification = __decorate([
    (0, typeorm_1.Entity)("specifications")
], Specification);
exports.Specification = Specification;
