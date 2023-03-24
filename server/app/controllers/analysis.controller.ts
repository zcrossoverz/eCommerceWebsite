import * as analysisServices from "../services/analysis.service"
import { Request, Response } from "express";


export const analysOverview = async (req: Request, res: Response) => {
    return res.json(await analysisServices.analysOverview());
}
