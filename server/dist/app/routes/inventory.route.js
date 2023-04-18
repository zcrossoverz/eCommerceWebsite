"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryRoutes = void 0;
const authMiddleware = __importStar(require("../middlewares/auth"));
const inventory = __importStar(require("../controllers/inventory.controller"));
const express_1 = __importDefault(require("express"));
const InventoryRoutes = (app) => {
    const router = express_1.default.Router();
    router.post("/inbound/:product_option_id", [authMiddleware.verifyToken(), authMiddleware.require_admin()], inventory.increaseStock);
    router.post("/outbound/:product_option_id", [authMiddleware.verifyToken(), authMiddleware.require_admin()], inventory.decreaseStock);
    router.post("/create_inbound_note", [authMiddleware.verifyToken(), authMiddleware.require_admin()], inventory.createInboundNote);
    router.get("/inbound_note/:id(\\d+)", [authMiddleware.verifyToken(), authMiddleware.require_admin()], inventory.getInboundNote);
    router.post("/inbound_note/:id", [authMiddleware.verifyToken(), authMiddleware.require_admin()], inventory.processInboundNote);
    router.delete("/inbound_note/:id", [authMiddleware.verifyToken(), authMiddleware.require_admin()], inventory.deleteInboundNote);
    router.get(/^\/inbound_note(\?)?(((limit=[0-9])|(page=[0-9]))?(\%26)?){2}$/, [authMiddleware.verifyToken(), authMiddleware.require_admin()], inventory.getAllInboundNote);
    app.use("/api/inventory", router);
};
exports.InventoryRoutes = InventoryRoutes;
