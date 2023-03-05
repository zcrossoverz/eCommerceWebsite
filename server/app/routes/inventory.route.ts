import * as inventory from "../controllers/inventory.controller";
import express, { Express } from "express";

export const InventoryRoutes = (app: Express) => {
    
    const router = express.Router();

    router.post("/inbound/:product_option_id", inventory.increaseStock);
    router.post("/outbound/:product_option_id", inventory.decreaseStock);
    router.post("/create_inbound_note", inventory.createInboundNote);
    router.get("/inbound_note/:id", inventory.getInboundNote);
    router.post("/inbound_note/:id", inventory.processInboundNote);

    app.use("/api/inventory", router);
}