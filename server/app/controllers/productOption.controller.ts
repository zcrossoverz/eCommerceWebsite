import { Request, Response } from "express";
import * as productOptionServices from "../services/productOption.service";

export const create = async (req: Request, res: Response) => {
    const { color, ram, rom, price } = req.body;
    const { id } = req.params;
    return res.json(await productOptionServices.create(Number(id), {color, ram, rom, price}));
}

export const deleteOne = async (req: Request, res: Response) => {
    return res.json(await productOptionServices.deleteOne(Number(req.params.id)));
}
