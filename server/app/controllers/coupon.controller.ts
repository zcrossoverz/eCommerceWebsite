/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NextFunction, Request, Response } from "express";
import * as couponServices from "../services/coupon.service";
import { isError } from "../utils/error";
import err from "../middlewares/error";


export const create = async (req: Request, res: Response, next: NextFunction) => {
    const { number, length, value, duplicate = 1, start_date, end_date, type } = req.body;
    const rs = await couponServices.createNew(number, length, value, duplicate, { start_date, end_date }, type);
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
}
 

export const checkCoupon = async (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.body;
    const rs = await couponServices.checkCoupon(code);
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
}