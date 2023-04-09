import { NextFunction, Request, Response } from "express";
import * as userServices from "../services/user.service";
import { BadRequestError, isError } from "../utils/error";
import err from "../middlewares/error";



export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const { limit = 10, page = 1 } = req.query;
    const rs = await userServices.getAll(Number(limit), Number(page));
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
}


export const createNew = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, firstName, lastName, phone } = req.body;
  const rs = await userServices.create({
    email,
    password,
    firstName,
    lastName,
    phone,
  });
  return isError(rs) ? next(err(rs, res)) : res.json(rs);
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
    const user_id = Number(req.params.id);
    const rs = await userServices.getOne(user_id);
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
};

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, firstName, lastName, phone, role } = req.body;
    const { id } = req.params;
    const rs = await userServices.updateOne(Number(id), {email, password, firstName, lastName, phone, role});
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
};

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const rs = await userServices.deleteOne(Number(id));
    return isError(rs) ? next(err(rs, res)) : res.json(rs);
};

export const addAddress = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { address } = req.body;
  const rs = await userServices.addAddress(Number(id), address);
  return isError(rs) ? next(err(rs, res)) : res.json(rs);
};

export const setDefaultAddress = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { id_address } = req.body;
  const rs = await userServices.setDefaultAddress(Number(id), Number(id_address));
  return isError(rs) ? next(err(rs, res)) : res.json(rs);
};

export const updateAddress = async (req: Request, res: Response, next: NextFunction) => {
  const { id_address, id_user } = req.params;
  const { address } = req.body;
  const rs = await userServices.updateAddress(Number(id_user), Number(id_address), address); 
  return isError(rs) ? next(err(rs, res)) : res.json(rs);
};

export const deleteAddress = async (req: Request, res: Response, next: NextFunction) => {
  const { id_address, id_user } = req.params;
  const rs = await userServices.deleteAddress(Number(id_user), Number(id_address));
  return isError(rs) ? next(err(rs, res)) : res.json(rs);
}

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { old_password, new_password } = req.body;
  if(!req.user) return next(err(BadRequestError("error"), res));
  const rs = await userServices.changePassword(req.user?.user_id , old_password, new_password);
  return isError(rs) ? next(err(rs, res)) : res.json(rs);
}