// import { Response } from "express";

export interface ErrorInterface {
    statusCode: number;
    error: string;
}

export const BadRequestError = (message: string, statusCode: number = 500):ErrorInterface => {
    return ({ statusCode, error: message });
}

export const isError = (obj: any): obj is ErrorInterface => {
    return Object.keys(obj).includes("error");
}