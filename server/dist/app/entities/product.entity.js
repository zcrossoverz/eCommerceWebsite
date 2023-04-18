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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const brand_entity_1 = require("./brand.entity");
const specification_entity_1 = require("./specification.entity");
const image_entity_1 = require("./image.entity");
const productOption_entity_1 = require("./productOption.entity");
const feedback_entity_1 = require("./feedback.entity");
let Product = class Product {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true
    }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: 'longtext'
    }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => brand_entity_1.Brand, brand => brand.products, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({
        name: "brand_id"
    }),
    __metadata("design:type", brand_entity_1.Brand)
], Product.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => specification_entity_1.Specification, specification => specification.product),
    __metadata("design:type", Array)
], Product.prototype, "specifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => image_entity_1.Image, image => image.product),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => productOption_entity_1.ProductOption, productOption => productOption.product),
    __metadata("design:type", Array)
], Product.prototype, "productOptions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => feedback_entity_1.Feedback, feedback => feedback.product),
    __metadata("design:type", Array)
], Product.prototype, "feedbacks", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: '0'
    }),
    __metadata("design:type", String)
], Product.prototype, "rate", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)("products")
], Product);
exports.Product = Product;
