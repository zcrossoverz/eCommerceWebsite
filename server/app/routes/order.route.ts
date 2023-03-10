/* eslint-disable no-useless-escape */
import * as order from "../controllers/order.controller";
import express, { Express } from "express";

export const OrderRoutes = (app: Express) => {
    
    const router = express.Router();

    router.post("/create_order", order.createOrder);
    router.get("/get_order/:order_id", order.getOneOrder);
    router.get(/^\/get_all(\?)?(((limit=[0-9])|(page=[0-9]))?(\%26)?){2}$/, order.getAllOrder)
    router.delete("/:order_id", order.deleteOrder);
    app.use("/api/order", router);
}