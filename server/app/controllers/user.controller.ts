import { Request, Response } from "express";
import * as userServices from "../services/user.service";



export const getAll = async (req: Request, res: Response) => {
    const result = await userServices.getAllUser();
    return res.json(result);
}


export const createNew = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, address, phone } = req.body;
  const result = await userServices.createUser({
    email,
    password,
    firstName,
    lastName,
    address,
    phone,
  });
  return res.json(result);
};

export const getOne = async (req: Request, res: Response) => {
    const user_id = Number(req.params.id);
    const result = await userServices.getOneUser(user_id);
    return res.json(result);
}

export const updateOne = async (req: Request, res: Response) => {
    const { email, password, firstName, lastName, address, phone } = req.body;
    const { id } = req.params;
    const result = await userServices.updateOneUser(Number(id), {email, password, firstName, lastName, address, phone});
    return res.json(result);
}

export const deleteOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await userServices.deleteOneUser(Number(id));
    return res.json(result);
}
