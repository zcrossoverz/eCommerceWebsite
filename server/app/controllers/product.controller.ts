import { Request, Response } from "express";
import * as productServices from "../services/product.service";



export const getAll = async (req: Request, res: Response) => {
    return res.json(await productServices.getAll());   
}

export const create = async (req: Request, res: Response) => {
    const { name, description, ram, rom, color, price, brand_id } = req.body;
    const file = req.file;
    if (!file) return res.json({msg: "image for product is required!"});
    const { path } = file;
    return res.json(await productServices.create({ name, description }, { ram, rom, color, price }, path, brand_id));
}

export const getOneById = async (req: Request, res: Response) => {
    const { id } = req.params;
    return res.json(await productServices.getOneById(Number(id)));
}

// export const addCategory = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { brand_id } = req.body;
//     return res.json(await productServices.addBrand(Number(id), brand_id));
// }

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
    return res.json(await productServices.update(Number(id), { name, description }));
}

export const deleteOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    return res.json(await productServices.deleteOne(Number(id)));
}