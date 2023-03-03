import * as specification from "../controllers/specification.controller";
import express, { Express } from "express";

export const specificationRoutes = (app: Express) => {
    const router = express.Router();

    router.post("/:product_id", specification.create);
    router.delete("/:id", specification.deleteOne);
    router.put("/:id", specification.updateOne);

    app.use("/api/specification", router);
}