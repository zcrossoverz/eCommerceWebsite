import { NextFunction, Request, Response } from "express"
import { checkEmail, checkPhoneNumber } from "../utils/validation"
import { BadRequestError } from "../utils/error";

export const validateEmail = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    if(!email) return next();
    const test: boolean = checkEmail(email);
    return test ? next() : res.json(BadRequestError("email is not valid!"));
};


export const validatePhoneNumber = (req: Request, res: Response, next: NextFunction) => {
    const { phone } = req.body;
    if(!phone) return next();
    const test = checkPhoneNumber(phone);
    return test ? next() : res.json(BadRequestError("phone number is not valid!"));
};