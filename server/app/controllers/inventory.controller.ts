import { NextFunction, Request, Response } from "express";
import * as inventoryServices from "../services/inventory.service";
import { isError } from "../utils/error";
import err from "../middlewares/error";

export const increaseStock = async (req: Request, res: Response, next: NextFunction) => {
    const { product_option_id } = req.params;
    const { quantity } = req.body;
    const rs = await inventoryServices.increaseStock(Number(product_option_id), quantity);
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
};

export const decreaseStock = async (req: Request, res: Response, next: NextFunction) => {
    const { product_option_id } = req.params;
    const { quantity } = req.body;
    const rs = await inventoryServices.decreaseStock(Number(product_option_id), quantity);
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
};

export const createInboundNote = async (req: Request, res: Response, next: NextFunction) => {
    const { data } = req.body;
    const rs = await inventoryServices.createWarehouseInboundNote(data);
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
};

export const getInboundNote = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const rs = await inventoryServices.getInboundNote(Number(id));
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
};

export const processInboundNote = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { accept } = req.body;
    const rs = await inventoryServices.processInboundNote(Number(id), accept);
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
};

export const deleteInboundNote = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const rs = await inventoryServices.deleteInboundNote(Number(id));
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
};

export const getAllInboundNote = async (req: Request, res: Response, next: NextFunction) => {
    const { limit = 10, page = 1 } = req.query;
    const rs = await inventoryServices.getAllInboundNote(Number(limit), Number(page));
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
};

export const analysis = async (req: Request, res: Response, next: NextFunction) => {
    const { limit = 10, page = 1 } = req.query;
    const rs = await inventoryServices.analysis(Number(limit), Number(page));
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
};