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
exports.feedbackRoutes = void 0;
const authMiddleware = __importStar(require("../middlewares/auth"));
const feedback = __importStar(require("../controllers/feedback.controller"));
const express_1 = __importDefault(require("express"));
const feedbackRoutes = (app) => {
    const router = express_1.default.Router();
    router.post("/create", [authMiddleware.verifyToken()], feedback.createFeedback);
    router.put("/update/:product_id", [authMiddleware.verifyToken()], feedback.updateFeedback);
    router.delete("/:feedback_id", [authMiddleware.verifyToken()], feedback.deleteFeedback);
    router.get("/get_by_product/:product_id", feedback.getFeedbackByProduct);
    router.get("/get_all", [authMiddleware.verifyToken(), authMiddleware.require_admin()], feedback.getAllFeedback);
    app.use("/api/feedback", router);
};
exports.feedbackRoutes = feedbackRoutes;
