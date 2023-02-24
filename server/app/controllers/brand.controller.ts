import * as brandServices from "../services/brand.service";
import { Request, Response } from "express";
import { BadRequestError } from "../utils/error";

export const create = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    return res.json(await brandServices.create({name, description}));
}

export const updateOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
    if(!name && !description) return res.json(BadRequestError("data empty"));
    return res.json(await brandServices.updateOne(Number(id), {name, description}));
}

export const deleteOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    return res.json(await brandServices.deleteOne(Number(id)));
}

export const getAll = async (req: Request, res: Response) => {
    return res.json(await brandServices.getAll());
}