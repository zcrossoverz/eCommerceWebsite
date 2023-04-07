import { NextFunction, Request, Response } from "express";
import * as productServices from "../services/product.service";
import err from "../middlewares/error";
import { BadRequestError, isError } from "../utils/error";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    limit = 10,
    page = 1,
    brand_id,
    price_min,
    price_max,
    rate,
    search,
    order = "newest",
  } = req.query;
  if (!brand_id && !price_max && !price_min && !rate) {
    const rs = await productServices.getAll(
      Number(limit),
      Number(page),
      null,
      search && String(search),
      String(order)
    );
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
  } else {
    const rs = await productServices.getAll(
      Number(limit),
      Number(page),
      {
        brand_id: brand_id ? Number(brand_id) : undefined,
        price: {
          min: price_min ? Number(price_min) : undefined,
          max: price_max ? Number(price_max) : undefined,
        },
        rate: rate ? Number(rate) : undefined,
      },
      search && String(search),
      String(order)
    );
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, description, ram, rom, color, price, brand_id } = req.body;
  const file = req.file;
  if (!file)
    return next(err(BadRequestError("image for product is required!"), res));
  const { path } = file;
  const rs = await productServices.create(
    { name, description },
    { ram, rom, color, price },
    path.replace(`public\\`, ""),
    brand_id
  );
  return isError(rs) ? next(err(rs, res)) : res.json(rs);
};

export const getOneById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const rs = await productServices.getOneById(Number(id));
  return isError(rs) ? next(err(rs, res)) : res.json(rs);
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const rs = await productServices.update(Number(id), { name, description });
  return isError(rs) ? next(err(rs, res)) : res.json(rs);
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const rs = await productServices.deleteOne(Number(id));
  return isError(rs) ? next(err(rs, res)) : res.json(rs);
};

export const addImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const files = req.files as Express.Multer.File[];
  const rs = await productServices.addImages(
    Number(id),
    files.map((e) => e.path.replace("public\\", ""))
  );
  return isError(rs) ? next(err(rs, res)) : res.json(rs);
};

export const canRate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) return next(err(BadRequestError("error"), res));
  const { product_id } = req.params;
  const rs = await productServices.canRate(
    Number(product_id),
    req.user.user_id
  );
  return isError(rs) ? next(err(rs, res)) : res.json(rs);
};
