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
exports.OrderRoutes = void 0;
const order = __importStar(require("../controllers/order.controller"));
const payment = __importStar(require("../controllers/payment.controller"));
const authMiddleware = __importStar(require("../middlewares/auth"));
const auth = __importStar(require("../middlewares/auth"));
const express_1 = __importDefault(require("express"));
const OrderRoutes = (app) => {
    const router = express_1.default.Router();
    router.post("/create_order", [authMiddleware.verifyToken()], order.createOrder);
    router.get("/get_order/:order_id", [authMiddleware.verifyToken()], order.getOneOrder);
    router.get("/get_status/:order_id", [authMiddleware.verifyToken()], order.getStatusOrder);
    router.get(/^\/get_all(\?)?(((limit=[0-9]+)|(page=[0-9]+))?(\%26)?){2}$/, [authMiddleware.verifyToken()], order.getAllOrder);
    router.get(/^\/get_all_by_user(\?)?(((limit=[0-9]+)|(page=[0-9]+)|(user_id=[0-9]+))?(\%26)?){3}$/, [authMiddleware.verifyToken()], order.getAllOrderByUser);
    router.post("/select_payment_method/:order_id", [authMiddleware.verifyToken()], payment.selectMethod);
    router.patch("/update_status_order/:order_id", [auth.verifyToken()], order.updateStatusOrder);
    router.patch("/update_address_order/:order_id", [auth.verifyToken()], order.updateAddressOrder);
    router.patch("/update_status_payment/:order_id", [authMiddleware.verifyToken()], payment.updateStatusPayment);
    router.delete("/:order_id", [authMiddleware.verifyToken()], order.deleteOrder);
    app.use("/api/order", router);
};
exports.OrderRoutes = OrderRoutes;
