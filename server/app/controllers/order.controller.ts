import { Request, Response } from "express";

const getAll = async (req: Request, res: Response) => {
    res.send("get all order");
}


module.exports = {
    getAll
};