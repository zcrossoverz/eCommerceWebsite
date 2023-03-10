import { Request, Response } from "express";
import * as paymentServices from "../services/payment.service";

export const selectMethod = async (req: Request, res: Response) => {
   const { method } = req.body;
   const { order_id } = req.params;
   return res.json(await paymentServices.selectMethod(Number(order_id), method))
}