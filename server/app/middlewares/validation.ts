import { NextFunction, Request, Response } from "express"
import { checkEmail, checkPhoneNumber } from "../utils/validation"
import { BadRequestError } from "../utils/error";
import { checkImageExtension } from "../utils/validation";
import err from "./error";

export const validateEmail = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    if(!email) return next();
    const test: boolean = checkEmail(email);
    return test ? next() : next(err(BadRequestError("email is not valid!"),res));
};


export const validatePhoneNumber = (req: Request, res: Response, next: NextFunction) => {
    const { phone } = req.body;
    if(!phone) return next();
    const test = checkPhoneNumber(phone);
    return test ? next() : next(err(BadRequestError("phone number is not valid!"),res));
};

export const validateImageExtension = (req: Request, res: Response, next: NextFunction) => {   
    if(!req.file && !req.files) return next(err(BadRequestError("image not found!"), res));
    if(req.file) {
        const { filename } = req.file;
        return checkImageExtension(filename) ? next() : next(err(BadRequestError("file extension is not valid"),res));
    }
    return next();
}