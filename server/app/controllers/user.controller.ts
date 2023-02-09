import { Request, Response } from "express";
import { createUserService } from "../services/user/createUser.service";



const getAll = async (req: Request, res: Response) => {
    return res.send("get all users");
}


const createNewUser = async (req: Request, res: Response) => {
    const {
        email,
        password,
        firstName,
        lastName,
        address,
        phone
    } = req.body;
    const createService = new createUserService();
    const result = await createService.execute({
        email,
        password,
        firstName,
        lastName,
        address,
        phone
    });
    return res.json(result);
}

const getOne = async (req: Request, res: Response) => {
    //const result =  await db.queryData('users', ['name','password'], [`id=${req.params.id}`]);
    res.json({a:1});
}

const updateOne = async (req: Request, res: Response) => {
   // const result = await db.updateData('users', {name:'nguyen trung nhan', password:99999}, {id:req.params.id});
    res.json({a:1})
}

const deleteOne = async (req: Request, res: Response) => {
    //const result = await db.deleteData('users', [`id=${req.params.id}`]);
    res.json({a:1});
}

const testJoin = async (req: Request, res: Response) => {
    //const result = await db.queryJoin();
    res.json({a:1})
}

module.exports = {
    getAll, createNewUser, getOne, updateOne, deleteOne, testJoin
};