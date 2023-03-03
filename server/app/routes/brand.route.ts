import * as brand from "../controllers/brand.controller";
import express, { Express } from "express";

export const brandRoutes = (app: Express) => {
    const router = express.Router();

    router.get("/", brand.getAll);
    router.post("/", brand.create);
    router.delete("/:id", brand.deleteOne);
    router.put("/:id", brand.updateOne);

    app.use("/api/brand", router);
}