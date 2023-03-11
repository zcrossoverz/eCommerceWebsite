import { NextFunction, Request, Response } from "express";
import * as productServices from "../services/product.service";
import err from "../middlewares/error";
import { BadRequestError, isError } from "../utils/error";



export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const { limit = 10, page = 1 } = req.query;
    const rs = await productServices.getAll(Number(limit), Number(page));   
    return isError(rs) ? next(err(rs, res)) : rs;
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, ram, rom, color, price, brand_id } = req.body;
    const file = req.file;
    if (!file) return next(err(BadRequestError("image for product is required!")));
    const { path } = file;
    const rs = await productServices.create({ name, description }, { ram, rom, color, price }, path, brand_id);
    return isError(rs) ? next(err(rs, res)) : rs;
}

export const getOneById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const rs = await productServices.getOneById(Number(id));
    return isError(rs) ? next(err(rs, res)) : rs;
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const rs = await productServices.update(Number(id), { name, description });
    return isError(rs) ? next(err(rs, res)) : rs;
}

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const rs = await productServices.deleteOne(Number(id));
    return isError(rs) ? next(err(rs, res)) : rs;
}