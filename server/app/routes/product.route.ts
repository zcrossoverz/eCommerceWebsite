const product = require("../controllers/product.controller");
import express, { Express } from "express";

export const ProductRoutes = (app: Express) => {
    let router = express.Router();

    router.get("/", product.getAll);
 
    app.use("/api/product", router);
}