import { Request, Response } from "express";
import * as productServices from "../services/product.service";



export const getAll = async (req: Request, res: Response) => {
    return res.json(await productServices.getAll());   
}

export const create = async (req: Request, res: Response) => {
    const { name, description, ram, rom, color, price } = req.body;
    const file = req.file;
    if (!file) return res.json({msg: "image for product is required!"});
    const { path } = file;
    return res.json(await productServices.create({ name, description }, { ram, rom, color, price }, path));
}