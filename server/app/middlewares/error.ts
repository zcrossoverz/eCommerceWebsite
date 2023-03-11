import { response } from "express";
import { ErrorInterface } from "../utils/error";

const err = (err: ErrorInterface, res = response) => {
    res.status(err.statusCode).json({ error: err.error });
    return;
}

export default err;