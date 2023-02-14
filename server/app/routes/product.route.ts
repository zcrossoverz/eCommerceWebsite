import * as product from "../controllers/product.controller";
import express, { Express } from "express";
import upload from "../middlewares/upload";
import * as validation from "../middlewares/validation";

export const ProductRoutes = (app: Express) => {
    let router = express.Router();


    router.get("/", product.getAll);
    router.post("/", [upload.single('image'), validation.validateImageExtension], product.create);
    router.get("/:id", product.getOneById);
    app.use("/api/product", router);
}