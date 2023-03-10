import * as productOption from "../controllers/productOption.controller";
import express, { Express } from "express";
import upload from "../middlewares/upload";
import * as validation from "../middlewares/validation";


export const ProductOptionRoutes = (app: Express) => {
    const router = express.Router();

    router.post("/:product_id", [upload.single('image'), validation.validateImageExtension], productOption.create);
    router.delete("/:id", productOption.deleteOne);
    router.put("/:id", productOption.updateOne);
    router.patch("/:id/update_stock", productOption.updateStock);

    app.use("/api/product_option", router);
}