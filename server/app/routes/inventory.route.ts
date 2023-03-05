import * as inventory from "../controllers/inventory.controller";
import express, { Express } from "express";

export const InventoryRoutes = (app: Express) => {
    
    const router = express.Router();

    router.post("/inbound/:product_option_id", inventory.increaseStock);
    router.post("/outbound/:product_option_id", inventory.decreaseStock);

    app.use("/api/inventory", router);
}