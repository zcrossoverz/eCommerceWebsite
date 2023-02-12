import { NextFunction, Request, Response } from "express"
import { checkEmail, checkPhoneNumber } from "../utils/validation"
import { BadRequestError } from "../utils/error";
import { checkImageExtension } from "../utils/validation";

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

export const validateImageExtension = (req: Request, res: Response, next: NextFunction) => {   
    if(!req.file) return res.json(BadRequestError("image not found!"));
    const { filename } = req.file;
    return checkImageExtension(filename) ? next() : res.json(BadRequestError("file extension is not valid"));
}