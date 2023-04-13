import * as analysisServices from "../services/analysis.service"
import { Request, Response } from "express";


export const analysOverview = async (req: Request, res: Response) => {
    return res.json(await analysisServices.analysOverview());
}

export const analysisSale = async (req: Request, res: Response) => {
    return res.json(await analysisServices.analysisSale());
}

export const reportRevenue = async (req: Request, res: Response) => {
    const { startDate, endDate } = req.body;
    return res.json(await analysisServices.reportRevenue(startDate, endDate));
}

export const reportInventory = async (req: Request, res: Response) => {
    const { startDate, endDate } = req.body;
    return res.json(await analysisServices.reportInventory(startDate, endDate));
}