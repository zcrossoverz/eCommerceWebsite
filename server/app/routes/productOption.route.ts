import * as productOption from "../controllers/productOption.controller";
import express, { Express } from "express";

export const ProductOptionRoutes = (app: Express) => {
    let router = express.Router();

    router.post("/:product_id", productOption.create);
    router.delete("/:id", productOption.deleteOne);
    router.put("/:id", productOption.updateOne);
    
    app.use("/api/product_option", router);
}