import * as productOption from "../controllers/productOption.controller";
import express, { Express } from "express";

export const ProductOptionRoutes = (app: Express) => {
    let router = express.Router();

    router.post("/:id", productOption.create);

    app.use("/api/product_option", router);
}