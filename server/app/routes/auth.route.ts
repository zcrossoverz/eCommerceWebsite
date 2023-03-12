import * as auth from "../controllers/auth.controller";
import express, { Express } from "express";
import * as authMiddleware from "../middlewares/auth";

export const AuthRoutes = (app: Express) => {
    const router = express.Router();

    router.post("/", auth.login);
    router.get("/", [authMiddleware.verifyToken(), authMiddleware.require_admin()], auth.testLogin);

    app.use("/api/auth", router);
}