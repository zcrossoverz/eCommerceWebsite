const db = require("../database");
const {handle} = require("../../utils/helpers/index");

const getAll = async (req, res) => {
    res.send("get all users");
}


const createNewUser = async (req, res) => {
    const result =  await db.insertData('specifications', {key:'test', product_id: 1, value:' hihi'}); 
    res.json(result)
}

const getOne = async (req, res) => {
    const result =  await db.queryData('users', ['name','password'], [`id=${req.params.id}`]);
    res.json(result);
}

const updateOne = async (req, res) => {
    const result = await db.updateData('users', {name:'nguyen trung nhan', password:99999}, {id:req.params.id});
    res.json(result)
}

const deleteOne = async (req, res) => {
    const result = await db.deleteData('users', [`id=${req.params.id}`]);
    res.json(result);
}

const testJoin = async (req, res) => {
    const result = await db.queryJoin();
    res.json(result)
}

module.exports = {
    getAll, createNewUser, getOne, updateOne, deleteOne, testJoin
};