import { NextFunction, Request, Response } from "express";
import * as notificationServices from "../services/notification.service";
import err from "../middlewares/error";
import { isError } from "../utils/error";

export const addNewNoti = (req: Request, res: Response, next: NextFunction) => {
    const { type } = req.body;
    const rs = notificationServices.addNewNoti(type);
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
}