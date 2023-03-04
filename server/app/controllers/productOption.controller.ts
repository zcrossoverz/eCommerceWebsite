import { Request, Response } from "express";
import * as productOptionServices from "../services/productOption.service";
import { BadRequestError } from "../utils/error";

export const create = async (req: Request, res: Response) => {
    const { color, ram, rom, price } = req.body;
    const { product_id } = req.params;
    return res.json(await productOptionServices.create(Number(product_id), {color, ram, rom, price}));
}

export const deleteOne = async (req: Request, res: Response) => {
    return res.json(await productOptionServices.deleteOne(Number(req.params.id)));
}

export const updateOne = async (req: Request, res: Response) => {
    const { color, ram, rom, price } = req.body;
    if(!color && !ram && !rom && !price) return res.json(BadRequestError("data empty"));
    return res.json(await productOptionServices.updateOne(Number(req.params.id), { color, ram, rom, price }));
}

export const updateStock = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { quantity } = req.body;
    return res.json(await productOptionServices.updateStock(Number(id), quantity));
}