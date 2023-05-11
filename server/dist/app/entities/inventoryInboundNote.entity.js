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
exports.InventoryInboundNote = exports.EnumInventoryInboundStatus = void 0;
const typeorm_1 = require("typeorm");
const orderItem_entity_1 = require("./orderItem.entity");
var EnumInventoryInboundStatus;
(function (EnumInventoryInboundStatus) {
    EnumInventoryInboundStatus[EnumInventoryInboundStatus["PENDING"] = 0] = "PENDING";
    EnumInventoryInboundStatus[EnumInventoryInboundStatus["COMPLETED"] = 1] = "COMPLETED";
    EnumInventoryInboundStatus[EnumInventoryInboundStatus["CANCELLED"] = 2] = "CANCELLED";
})(EnumInventoryInboundStatus = exports.EnumInventoryInboundStatus || (exports.EnumInventoryInboundStatus = {}));
let InventoryInboundNote = class InventoryInboundNote {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InventoryInboundNote.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: EnumInventoryInboundStatus,
        default: EnumInventoryInboundStatus.PENDING
    }),
    __metadata("design:type", Number)
], InventoryInboundNote.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderItem_entity_1.OrderItem, item => item.inventoryInboundNote),
    __metadata("design:type", Array)
], InventoryInboundNote.prototype, "orderItems", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], InventoryInboundNote.prototype, "create_at", void 0);
InventoryInboundNote = __decorate([
    (0, typeorm_1.Entity)("inventory_inbound_notes")
], InventoryInboundNote);
exports.InventoryInboundNote = InventoryInboundNote;
