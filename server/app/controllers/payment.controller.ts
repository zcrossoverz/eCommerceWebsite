import { NextFunction, Request, Response } from "express";
import * as paymentServices from "../services/payment.service";
import { isError } from "../utils/error";
import err from "../middlewares/error";

export const selectMethod = async (req: Request, res: Response, next: NextFunction) => {
   const { method } = req.body;
   const { order_id } = req.params;
   const rs = await paymentServices.selectMethod(Number(order_id), method);
   return isError(rs) ? next(err(rs, res)) : res.json(rs);
}


export const updateStatusPayment = async (req: Request, res: Response, next: NextFunction) => {
   const { order_id } = req.params;
   const rs = await paymentServices.updateStatus(Number(order_id));
   return isError(rs) ? next(err(rs, res)) : res.json(rs);
}

// export const createPaypalOrder = (req: Request, res: Response, next: NextFunction) => {
//    return res.json(paymentServices.createPaypalOrder());
// }

// export const capturePayment = async (req: Request, res: Response, next: NextFunction) => {
//    const { order_id } = req.body;
//    return res.json(await paymentServices.capturePayment(order_id));
// }