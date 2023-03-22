/* eslint-disable no-useless-escape */
import * as authMiddleware from "../middlewares/auth";
import * as notification from "../controllers/notification.controller";
import express, { Express } from "express";

export const NotifyRoutes = (app: Express) => {
    
    const router = express.Router();

    router.post("/add", notification.addNewNoti);
    router.get("/get_all/:user_id(\\d+)", [authMiddleware.verifyToken()], notification.getAllNoti);
    router.get("/get_unread/:user_id(\\d+)", [authMiddleware.verifyToken()], notification.getUnreadNoti);

    app.use("/api/notification", router);
}