import { NextFunction, Request, Response } from "express";
import * as specServices from "../services/specificationService.service";
import { BadRequestError, isError } from "../utils/error";
import err from "../middlewares/error";

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const { product_id } = req.params;
    const { key, value } = req.body;
    const rs = await specServices.create(Number(product_id), { key, value });
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
}

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const rs = await specServices.deleteOne(Number(req.params.id));
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
}

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
    const { key, value } = req.body;
    if(!key && !value) return next(err(BadRequestError("data empty"), res));
    const rs = await specServices.updateOne(Number(req.params.id), { key, value });
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
}