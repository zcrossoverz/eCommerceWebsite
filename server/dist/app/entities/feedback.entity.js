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
exports.Feedback = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const user_entity_1 = require("./user.entity");
let Feedback = class Feedback {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Feedback.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        nullable: false,
    }),
    __metadata("design:type", Number)
], Feedback.prototype, "rate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        transformer: {
            to(value) {
                return value ? value : null;
            },
            from(value) {
                return value;
            }
        },
    }),
    __metadata("design:type", String)
], Feedback.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], Feedback.prototype, "create_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, product => product.feedbacks, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({
        name: "product_id"
    }),
    __metadata("design:type", product_entity_1.Product)
], Feedback.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.feedbacks, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({
        name: "user_id"
    }),
    __metadata("design:type", user_entity_1.User)
], Feedback.prototype, "user", void 0);
Feedback = __decorate([
    (0, typeorm_1.Entity)("feedback")
], Feedback);
exports.Feedback = Feedback;
