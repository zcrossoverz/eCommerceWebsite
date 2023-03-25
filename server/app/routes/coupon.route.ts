import * as coupon from "../controllers/coupon.controller";
import express, { Express } from "express";
import * as authMiddleware from "../middlewares/auth";

export const CouponRoutes = (app: Express) => {
    const router = express.Router();

    router.post("/create", [authMiddleware.verifyToken(), authMiddleware.require_admin()], coupon.create);
    router.post("/check", [authMiddleware.verifyToken(), authMiddleware.require_admin()], coupon.checkCoupon);

    app.use("/api/coupon", router);
}