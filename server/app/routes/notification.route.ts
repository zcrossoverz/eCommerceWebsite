/* eslint-disable no-useless-escape */
import * as notification from "../controllers/notification.controller";
import express, { Express } from "express";

export const NotifyRoutes = (app: Express) => {
    
    const router = express.Router();

    router.post("/add", notification.addNewNoti);

    app.use("/api/notification", router);
}