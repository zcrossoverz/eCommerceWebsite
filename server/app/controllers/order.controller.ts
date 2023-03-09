import { Request, Response } from "express";
import * as orderServices from "../services/order.service";

export const createOrder = async (req: Request, res: Response) => {
    const { user_id, items, address = null } = req.body;
    return res.json(await orderServices.createOrder(Number(user_id), items, address));
}

