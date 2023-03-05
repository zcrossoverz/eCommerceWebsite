import { Request, Response } from "express";
import * as inventoryServices from "../services/inventory.service";

export const increaseStock = async (req: Request, res: Response) => {
    const { product_option_id } = req.params;
    const { quantity } = req.body;
    return res.json(await inventoryServices.increaseStock(Number(product_option_id), quantity));
};

export const decreaseStock = async (req: Request, res: Response) => {
    const { product_option_id } = req.params;
    const { quantity } = req.body;
    return res.json(await inventoryServices.decreaseStock(Number(product_option_id), quantity));
};

export const createInboundNote = async (req: Request, res: Response) => {
    const { data } = req.body;
    return res.json(await inventoryServices.createWarehouseInboundNote(data));
};

export const getInboundNote = async (req: Request, res: Response) => {
    const { id } = req.params;
    return res.json(await inventoryServices.getInboundNote(Number(id)));
}