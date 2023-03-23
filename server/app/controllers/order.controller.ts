import { NextFunction, Request, Response } from "express";
import * as orderServices from "../services/order.service";
import { isError } from "../utils/error";
import err from "../middlewares/error";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, items, address = null } = req.body;
    const rs = await orderServices.createOrder(Number(user_id), items, address);
    if(orderServices.instanceOfErrorInfo(rs)) return res.status(500).json(rs);
    if(isError(rs)) return next(err(rs, res));
    return res.json(rs);
}

export const getOneOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { order_id } = req.params;
    const rs = await orderServices.getOneOrder(Number(order_id));
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
}

export const getAllOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { limit = 10, page = 1 } = req.query;
    const rs = await orderServices.getAllOrder(Number(limit), Number(page));
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
}

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { order_id } = req.params;
    const rs = await orderServices.deleteOrder(Number(order_id));
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
}

export const updateStatusOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { order_id } = req.params;
    const { status } = req.body;
    const rs = await orderServices.updateStatusOrder(Number(order_id), status);
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
    
}

export const getStatusOrder =async (req: Request, res: Response, next: NextFunction) => {
    const { order_id } = req.params;
    const order = await orderServices.getOneOrder(Number(order_id));
    if(isError(order)) return next(err(order, res));
    return res.json({
        status: order.status,
        payment: order.payment.method,
        is_paid: order.payment.is_paid,
    });
}