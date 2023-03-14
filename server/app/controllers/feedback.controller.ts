import * as feedbackServices from "../services/feedback.service";
import { NextFunction, Request, Response } from "express";
import { BadRequestError, isError } from "../utils/error";
import err from "../middlewares/error";


export const createFeedback =  async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, product_id, rate, comment } = req.body;
    if(!user_id || !product_id) return next(err(BadRequestError("product or user id not found"), res));
    if(!rate) return next(err(BadRequestError("rate cannot empty"), res));
    const rs = await feedbackServices.createFeedback(Number(product_id), Number(user_id), Number(rate), comment && comment);
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
}

export const updateFeedback = async (req: Request, res: Response, next: NextFunction) => {
    const { feedback_id } = req.params;
    const { rate, comment } = req.body;
    const rs = await feedbackServices.updateFeedback(Number(feedback_id), { rate, comment });
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
}

export const deleteFeedback = async (req: Request, res: Response, next: NextFunction) => {
    const { feedback_id } = req.params;
    const rs = await feedbackServices.deleteFeedback(Number(feedback_id));
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
}

export const getFeedbackByProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { product_id } = req.params;
    const rs = await feedbackServices.getFeedbackByProduct(Number(product_id));
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
}