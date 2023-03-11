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