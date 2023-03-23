/* eslint-disable no-useless-escape */
import * as order from "../controllers/order.controller";
import * as payment from "../controllers/payment.controller";
import * as authMiddleware from "../middlewares/auth";
import * as auth from "../middlewares/auth";

import express, { Express } from "express";

export const OrderRoutes = (app: Express) => {
    
    const router = express.Router();

    router.post("/create_order", [authMiddleware.verifyToken()],order.createOrder);
    router.get("/get_order/:order_id",[authMiddleware.verifyToken()], order.getOneOrder);
    router.get("/get_status/:order_id", [authMiddleware.verifyToken()], order.getStatusOrder);
    router.get(/^\/get_all(\?)?(((limit=[0-9])|(page=[0-9]))?(\%26)?){2}$/, [authMiddleware.verifyToken()], order.getAllOrder);
    router.post("/select_payment_method/:order_id", [authMiddleware.verifyToken()], payment.selectMethod);
    router.patch("/update_status_order/:order_id", [auth.verifyToken(), auth.require_admin()], order.updateStatusOrder);
    router.patch("/update_address_order/:order_id", [auth.verifyToken(), auth.require_admin()], order.updateAddressOrder);
    router.patch("/update_status_payment/:order_id", [authMiddleware.verifyToken()], payment.updateStatusPayment);
    router.delete("/:order_id", [authMiddleware.verifyToken()], order.deleteOrder);

    // router.get("/paypal", payment.createPaypalOrder);
    // router.get("/paypal_capture", payment.capturePayment);

    app.use("/api/order", router);
}