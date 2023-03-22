import * as productOption from "../controllers/productOption.controller";
import express, { Express } from "express";
import upload from "../middlewares/upload";
import * as authMiddleware from "../middlewares/auth";
import * as validation from "../middlewares/validation";


export const ProductOptionRoutes = (app: Express) => {
    const router = express.Router();

    router.post("/:product_id", [authMiddleware.verifyToken(), authMiddleware.require_admin(), upload.single('image'), validation.validateImageExtension], productOption.create);
    router.delete("/:id", [authMiddleware.verifyToken(), authMiddleware.require_admin()], productOption.deleteOne);
    router.put("/:id", [authMiddleware.verifyToken(), authMiddleware.require_admin()], productOption.updateOne);
    router.patch("/:id/update_stock", [authMiddleware.verifyToken(), authMiddleware.require_admin()], productOption.updateStock);

    app.use("/api/product_option", router);
}