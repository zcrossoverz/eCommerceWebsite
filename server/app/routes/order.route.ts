import * as order from "../controllers/order.controller";
import express, { Express } from "express";

export const OrderRoutes = (app: Express) => {
    
    const router = express.Router();

    router.get("/", order.getAll);

    app.use("/api/order", router);
}