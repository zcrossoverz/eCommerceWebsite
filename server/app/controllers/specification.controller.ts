import { Request, Response } from "express";
import * as specServices from "../services/specificationService.service";

export const create = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { key, value } = req.body;
    return res.json(await specServices.create(Number(id), { key, value }));
}