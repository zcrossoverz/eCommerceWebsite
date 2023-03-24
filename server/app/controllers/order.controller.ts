import { NextFunction, Request, Response } from "express";
import * as orderServices from "../services/order.service";
import * as analysServices from "../services/analysis.service";
import { isError } from "../utils/error";
import err from "../middlewares/error";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, items, address = null } = req.body;
    const rs = await orderServices.createOrder(Number(user_id), items, address);
    if(orderServices.instanceOfErrorInfo(rs)) return res.status(500).json({
        type: rs.type,
        product_option_id: rs.product_option_id
    });
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

export const getAllOrderByUser = async (req: Request, res: Response, next: NextFunction) => {
    const { limit = 10, page = 1, user_id = 0 } = req.query;
    // console.log(user_id);
    
    const rs = await orderServices.getAllOrderByUser(Number(user_id), Number(limit), Number(page));
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

export const updateAddressOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { order_id } = req.params;
    const { address } = req.body;
    const rs = await orderServices.updateAddressOrder(Number(order_id), address);
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
    
}

export const top_sale = async (req: Request, res: Response, next: NextFunction) => {
    const rs = await analysServices.top_sale();
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
}