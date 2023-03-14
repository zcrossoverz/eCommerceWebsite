import { NextFunction, Request, Response } from "express";
import * as productOptionServices from "../services/productOption.service";
import { BadRequestError, isError } from "../utils/error";
import err from "../middlewares/error";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { color, ram, rom, price } = req.body;
  const { product_id } = req.params;
  const file = req.file;
  console.log(file);
  
  if (!file) return next(err(BadRequestError("image for product is required!"), res));
  const { path } = file;
  const rs = await productOptionServices.create(Number(product_id), {
    color,
    ram,
    rom,
    price,
 
  },    path.replace(`public\\`, ``));
  return isError(rs) ? next(err(rs, res)) : res.json(rs);
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const rs = await productOptionServices.deleteOne(Number(req.params.id));
  return isError(rs) ? next(err(rs, res)) : res.json(rs);
};

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { color, ram, rom, price } = req.body;
  if (!color && !ram && !rom && !price)
    return next(err(BadRequestError("data empty"), res));
  const rs = await productOptionServices.updateOne(Number(req.params.id), {
    color,
    ram,
    rom,
    price,
  });
  return isError(rs) ? next(err(rs, res)) : res.json(rs);
};

export const updateStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const rs = await productOptionServices.updateStock(Number(id), quantity);
  return isError(rs) ? next(err(rs, res)) : res.json(rs);
};
