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