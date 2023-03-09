import { Request, Response } from "express";
import * as userServices from "../services/user.service";



export const getAll = async (req: Request, res: Response) => {
  const { limit = 10, page = 1 } = req.query;
    const result = await userServices.getAll(Number(limit), Number(page));
    return res.json(result);
}


export const createNew = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, phone } = req.body;
  const result = await userServices.create({
    email,
    password,
    firstName,
    lastName,
    phone,
  });
  return res.json(result);
};

export const getOne = async (req: Request, res: Response) => {
    const user_id = Number(req.params.id);
    const result = await userServices.getOne(user_id);
    return res.json(result);
};

export const updateOne = async (req: Request, res: Response) => {
    const { email, password, firstName, lastName, phone } = req.body;
    const { id } = req.params;
    const result = await userServices.updateOne(Number(id), {email, password, firstName, lastName, phone});
    return res.json(result);
};

export const deleteOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await userServices.deleteOne(Number(id));
    return res.json(result);
};

export const addAddress = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { address } = req.body;
  const result = await userServices.addAddress(Number(id), address);
  return res.json(result);
};

export const setDefaultAddress = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id_address } = req.body;
  const result = await userServices.setDefaultAddress(Number(id), Number(id_address));
  return res.json(result);
};

export const updateAddress = async (req: Request, res: Response) => {
  const { id_address, id_user } = req.params;
  const { address } = req.body;
  return res.json(await userServices.updateAddress(Number(id_user), Number(id_address), address)); 
};

export const deleteAddress = async (req: Request, res: Response) => {
  const { id_address, id_user } = req.params;
  return res.json(await userServices.deleteAddress(Number(id_user), Number(id_address)));
}