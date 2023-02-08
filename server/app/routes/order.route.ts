const order = require("../controllers/order.controller");
import express, { Express } from "express";

export const OrderRoutes = (app: Express) => {
    
    let router = express.Router();

    router.get("/", order.getAll);

    app.use("/api/order", router);
}