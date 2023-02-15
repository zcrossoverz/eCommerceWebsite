import * as category from "../controllers/category.controller";
import express, { Express } from "express";

export const categoryRoutes = (app: Express) => {
    let router = express.Router();

    router.get("/", category.getAll);
    router.post("/", category.create);
    router.delete("/:id", category.deleteOne);
    router.put("/:id", category.updateOne);

    app.use("/api/category", router);
}