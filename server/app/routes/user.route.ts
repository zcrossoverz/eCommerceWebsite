import * as user from "../controllers/user.controller";
import express, { Express } from "express";

export const UserRoutes = (app: Express) => {
    let router = express.Router();

    router.get("/", user.getAll);
    router.post("/", user.createNew);
    router.get("/:id", user.getOne);
    router.put("/:id", user.updateOne); 
    router.delete("/:id", user.deleteOne);

    app.use("/api/user", router);
}