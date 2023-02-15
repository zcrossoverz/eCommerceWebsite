import * as specification from "../controllers/specification.controller";
import express, { Express } from "express";

export const specificationRoutes = (app: Express) => {
    let router = express.Router();
    router.post("/:id", specification.create);

    app.use("/api/specification", router);
}