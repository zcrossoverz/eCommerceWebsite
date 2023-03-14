import * as feedback from "../controllers/feedback.controller";
import express, { Express } from "express";

export const feedbackRoutes = (app: Express) => {
    const router = express.Router();

    router.post("/create", feedback.createFeedback);
    router.put("/update/:feedback_id", feedback.updateFeedback);

    app.use("/api/feedback", router);
}