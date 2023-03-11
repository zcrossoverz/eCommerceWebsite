import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import { BadRequestError, isError } from "../utils/error";
import * as userServices from "../services/user.service";
import bcrypt from "bcryptjs";
import err from "../middlewares/error";


passport.use(new Strategy({ 
    secretOrKey: process.env.JWT_SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
 }, (payload, done) => {
    const { user_id, firstName, lastName, role } = payload;
    if(!user_id || !firstName || !lastName || !role){
        return done("token is not valid!", false);
    }
    // console.log(user_id, firstName, lastName, role);
    return done(null, {
        user_id, firstName, lastName, role
    });
}));


export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if(email && password) {
        const user = await userServices.findOneByEmail(email);
        if(isError(user)){
            return next(err(BadRequestError("user not found!"), res));
        }
        if(bcrypt.compareSync(password, user.password)) return res.json({
            message:"login success",
            token: jwt.sign({
                user_id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            }, process.env.JWT_SECRET_KEY || "nhan")
        })
        else return next(err(BadRequestError("password is incorrect!"), res)); 
    }
    return next(err(BadRequestError("email or password cannot be empty!"), res)); 
}

export const testLogin = (req: Request, res: Response) => {
    return res.json({"login success":"ok"});
}