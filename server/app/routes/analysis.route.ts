/* eslint-disable no-useless-escape */
import * as brand from "../controllers/brand.controller";
import * as inventory from "../controllers/inventory.controller";
import express, { Express } from "express";
import * as authMiddleware from "../middlewares/auth";

export const AnalysisRoutes = (app: Express) => {
    const router = express.Router();

    router.get("/brand", [authMiddleware.verifyToken(), authMiddleware.require_admin()], brand.countProduct);
    router.get(/^\/product_in_warehouse(\?)?(((limit=[0-9])|(page=[0-9]))?(\%26)?){2}$/, [authMiddleware.verifyToken(), authMiddleware.require_admin()], inventory.analysis);

    app.use("/api/analysis", router);
}