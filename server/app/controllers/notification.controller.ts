import { NextFunction, Request, Response } from "express";
import * as notificationServices from "../services/notification.service";
import err from "../middlewares/error";
import { isError } from "../utils/error";

export const addNewNoti = async (req: Request, res: Response, next: NextFunction) => {
    const { type, id, user_id } = req.body;
    const rs = await notificationServices.addNewNoti(type, id, Number(user_id));
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
}