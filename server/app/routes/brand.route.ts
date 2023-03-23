import * as brand from "../controllers/brand.controller";
import * as authMiddleware from "../middlewares/auth";
import express, { Express } from "express";

export const brandRoutes = (app: Express) => {
    const router = express.Router();

    router.get("/", brand.getAll);
    router.get("/count", brand.countProduct);
    router.post("/", [authMiddleware.verifyToken(), authMiddleware.require_admin()], brand.create);
    router.delete("/:id", [authMiddleware.verifyToken(), authMiddleware.require_admin()], brand.deleteOne);
    router.put("/:id", [authMiddleware.verifyToken(), authMiddleware.require_admin()], brand.updateOne);

    app.use("/api/brand", router);
}