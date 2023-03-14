import * as feedback from "../controllers/feedback.controller";
import express, { Express } from "express";

export const feedbackRoutes = (app: Express) => {
    const router = express.Router();

    router.post("/create", feedback.createFeedback);
    router.put("/update/:feedback_id", feedback.updateFeedback);
    router.delete("/:feedback_id", feedback.deleteFeedback);
    router.get("/get_by_product/:product_id", feedback.getFeedbackByProduct);

    app.use("/api/feedback", router);
}