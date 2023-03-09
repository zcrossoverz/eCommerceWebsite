/* eslint-disable no-useless-escape */
import * as inventory from "../controllers/inventory.controller";
import express, { Express } from "express";

export const InventoryRoutes = (app: Express) => {
    
    const router = express.Router();

    router.post("/inbound/:product_option_id", inventory.increaseStock);
    router.post("/outbound/:product_option_id", inventory.decreaseStock);
    router.post("/create_inbound_note", inventory.createInboundNote);
    router.get("/inbound_note/:id(/^([0-9]){1,}$/)", inventory.getInboundNote);
    router.post("/inbound_note/:id", inventory.processInboundNote);
    router.delete("/inbound_note/:id", inventory.processInboundNote);
    router.get(/^\/inbound_note(\?)?(((limit=[0-9])|(page=[0-9]))?(\%26)?){2}$/, inventory.getAllInboundNote);

    app.use("/api/inventory", router);
}