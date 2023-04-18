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
exports.AnalysisRoutes = void 0;
const brand = __importStar(require("../controllers/brand.controller"));
const inventory = __importStar(require("../controllers/inventory.controller"));
const order = __importStar(require("../controllers/order.controller"));
const analysis = __importStar(require("../controllers/analysis.controller"));
const product_option = __importStar(require("../controllers/productOption.controller"));
const express_1 = __importDefault(require("express"));
const authMiddleware = __importStar(require("../middlewares/auth"));
const AnalysisRoutes = (app) => {
    const router = express_1.default.Router();
    router.get("/brand", [authMiddleware.verifyToken(), authMiddleware.require_admin()], brand.countProduct);
    router.get(/^\/product_in_warehouse(\?)?(((limit=[0-9])|(page=[0-9])|query=\\w+)?(\%26)?){2}$/, [authMiddleware.verifyToken(), authMiddleware.require_admin()], inventory.analysis);
    router.get("/top_sale", order.top_sale);
    router.get("/overview", analysis.analysOverview);
    router.get("/prices/:product_option_id", product_option.analysisPrices);
    router.get("/sales", analysis.analysisSale);
    router.post("/report_revenue", analysis.reportRevenue);
    router.post("/report_inventory", analysis.reportInventory);
    router.get("/tracking_product/:product_id", analysis.productTracking);
    app.use("/api/analysis", router);
};
exports.AnalysisRoutes = AnalysisRoutes;
