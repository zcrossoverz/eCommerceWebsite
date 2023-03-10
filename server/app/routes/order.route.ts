import * as order from "../controllers/order.controller";
import express, { Express } from "express";

export const OrderRoutes = (app: Express) => {
    
    const router = express.Router();

    router.post("/create_order", order.createOrder);
    router.get("/get_order/:order_id", order.getOneOrder)

    app.use("/api/order", router);
}