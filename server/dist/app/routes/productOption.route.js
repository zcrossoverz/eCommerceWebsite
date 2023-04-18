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
exports.ProductOptionRoutes = void 0;
const productOption = __importStar(require("../controllers/productOption.controller"));
const express_1 = __importDefault(require("express"));
const upload_1 = __importDefault(require("../middlewares/upload"));
const authMiddleware = __importStar(require("../middlewares/auth"));
const validation = __importStar(require("../middlewares/validation"));
const ProductOptionRoutes = (app) => {
    const router = express_1.default.Router();
    router.post("/:product_id", [authMiddleware.verifyToken(), authMiddleware.require_admin(), upload_1.default.single('image'), validation.validateImageExtension], productOption.create);
    router.delete("/:id", [authMiddleware.verifyToken(), authMiddleware.require_admin()], productOption.deleteOne);
    router.put("/:id", [authMiddleware.verifyToken(), authMiddleware.require_admin()], productOption.updateOne);
    router.patch("/:id/update_stock", [authMiddleware.verifyToken(), authMiddleware.require_admin()], productOption.updateStock);
    router.patch("/:id/update_price", [authMiddleware.verifyToken(), authMiddleware.require_admin()], productOption.updatePrice);
    app.use("/api/product_option", router);
};
exports.ProductOptionRoutes = ProductOptionRoutes;
