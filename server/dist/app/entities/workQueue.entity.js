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
exports.WorkQueue = exports.EnumWorkQueueType = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const product_entity_1 = require("./product.entity");
var EnumWorkQueueType;
(function (EnumWorkQueueType) {
    EnumWorkQueueType[EnumWorkQueueType["NONE"] = 0] = "NONE";
    EnumWorkQueueType[EnumWorkQueueType["RATE"] = 1] = "RATE";
    EnumWorkQueueType[EnumWorkQueueType["ORDER"] = 2] = "ORDER";
})(EnumWorkQueueType = exports.EnumWorkQueueType || (exports.EnumWorkQueueType = {}));
let WorkQueue = class WorkQueue {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WorkQueue.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EnumWorkQueueType
    }),
    __metadata("design:type", Number)
], WorkQueue.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: false
    }),
    __metadata("design:type", Boolean)
], WorkQueue.prototype, "is_done", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.workqueue, {
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({
        name: "user_id"
    }),
    __metadata("design:type", user_entity_1.User)
], WorkQueue.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => product_entity_1.Product, { nullable: true }),
    (0, typeorm_1.JoinColumn)({
        name: "product_id",
    }),
    __metadata("design:type", product_entity_1.Product)
], WorkQueue.prototype, "product", void 0);
WorkQueue = __decorate([
    (0, typeorm_1.Entity)("work_queue")
], WorkQueue);
exports.WorkQueue = WorkQueue;
