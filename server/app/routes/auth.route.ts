import * as auth from "../controllers/auth.controller";
import express, { Express } from "express";
import * as authentication from "../middlewares/authentication";

export const AuthRoutes = (app: Express) => {
    const router = express.Router();

    router.post("/", auth.login);
    router.get("/", [authentication.verifyToken()], auth.testLogin);

    app.use("/api/auth", router);
}