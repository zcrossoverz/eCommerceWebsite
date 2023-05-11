/* eslint-disable no-useless-escape */
import * as brand from "../controllers/brand.controller";
import * as inventory from "../controllers/inventory.controller";
import * as order from "../controllers/order.controller";
import * as analysis from "../controllers/analysis.controller";
import * as product_option from "../controllers/productOption.controller";
import express, { Express } from "express";
import * as authMiddleware from "../middlewares/auth";

export const AnalysisRoutes = (app: Express) => {
    const router = express.Router();

    router.get("/brand", [authMiddleware.verifyToken(), authMiddleware.require_admin()], brand.countProduct);
    router.get(/^\/product_in_warehouse(\?)?(((limit=[0-9])|(page=[0-9])|query=\\w+)?(\%26)?){2}$/, [authMiddleware.verifyToken(), authMiddleware.require_admin()], inventory.analysis);
    router.get("/top_sale", order.top_sale);

    router.get("/overview", analysis.analysOverview);
    router.get("/prices/:product_option_id", product_option.analysisPrices);

    router.get("/sales", analysis.analysisSale);
    router.post("/report_revenue", analysis.reportRevenue);
    router.post("/report_inventory", analysis.reportInventory);
    router.get("/tracking_product/:product_id", analysis.productTracking);

    app.use("/api/analysis", router);
}