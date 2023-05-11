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
exports.ProductRoutes = void 0;
const product = __importStar(require("../controllers/product.controller"));
const express_1 = __importDefault(require("express"));
const upload_1 = __importDefault(require("../middlewares/upload"));
const authMiddleware = __importStar(require("../middlewares/auth"));
const validation = __importStar(require("../middlewares/validation"));
const ProductRoutes = (app) => {
    const router = express_1.default.Router();
    router.get(/^\/get_all(\?)?(((limit=[0-9]+)|(page=[0-9]+)|(brand_id=[0-9]+)|(price_min=[0-9]+)|(price_max=[0-9]+)|(rate=[0-9]+)|query=\\w+)?(\%26)?){2}$/, product.getAll);
    router.post("/", [authMiddleware.verifyToken(), authMiddleware.require_admin(), upload_1.default.single('image'), validation.validateImageExtension], product.create);
    router.post("/add_images/:id", [authMiddleware.verifyToken(), authMiddleware.require_admin(), upload_1.default.array('image', 5), validation.validateImageExtension], product.addImages);
    router.get("/:id(\\d+)", product.getOneById);
    router.put("/:id", [authMiddleware.verifyToken(), authMiddleware.require_admin()], product.update);
    router.delete("/:id", [authMiddleware.verifyToken(), authMiddleware.require_admin()], product.deleteOne);
    router.get("/can_rate/:product_id", [authMiddleware.verifyToken()], product.canRate);
    router.post("/hhmb", product.hoanghamb);
    app.use("/api/product", router);
};
exports.ProductRoutes = ProductRoutes;
