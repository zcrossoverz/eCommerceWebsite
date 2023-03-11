import { Request, Response } from "express";
import * as orderServices from "../services/order.service";

export const createOrder = async (req: Request, res: Response) => {
    const { user_id, items, address = null } = req.body;
    return res.json(await orderServices.createOrder(Number(user_id), items, address));
}

export const getOneOrder = async (req: Request, res: Response) => {
    const { order_id } = req.params;
    return res.json(await orderServices.getOneOrder(Number(order_id)));
}

export const getAllOrder = async (req: Request, res: Response) => {
    const { limit = 10, page = 1 } = req.query;
    return res.json(await orderServices.getAllOrder(Number(limit), Number(page)));
}

export const deleteOrder = async (req: Request, res: Response) => {
    const { order_id } = req.params;
    return res.json(await orderServices.deleteOrder(Number(order_id)));
}

export const updateStatusOrder = async (req: Request, res: Response) => {
    const { order_id } = req.params;
    const { status } = req.body
    return res.json(await orderServices.updateStatusOrder(Number(order_id), status));
}