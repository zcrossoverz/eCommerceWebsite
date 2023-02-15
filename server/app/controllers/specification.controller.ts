import { Request, Response } from "express";
import * as specServices from "../services/specificationService.service";
import { BadRequestError } from "../utils/error";

export const create = async (req: Request, res: Response) => {
    const { product_id } = req.params;
    const { key, value } = req.body;
    return res.json(await specServices.create(Number(product_id), { key, value }));
}

export const deleteOne = async (req: Request, res: Response) => {
    return res.json(await specServices.deleteOne(Number(req.params.id)));
}

export const updateOne = async (req: Request, res: Response) => {
    const { key, value } = req.body;
    if(!key && !value) return res.json(BadRequestError("data empty"));
    return res.json(await specServices.updateOne(Number(req.params.id), { key, value }));
}