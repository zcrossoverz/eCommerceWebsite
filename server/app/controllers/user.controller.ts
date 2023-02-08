import { Request, Response } from "express";

const getAll = async (req: Request, res: Response) => {
    res.send("get all users");
}


const createNewUser = async (req: Request, res: Response) => {
   // const result =  await db.insertData('specifications', {key:'test', product_id: 1, value:' hihi'}); 
    res.json({a:1})
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