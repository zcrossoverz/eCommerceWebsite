const db = require("../database");
const {handle} = require("../../utils/helpers/index");

const getAll = async (req, res) => {
    res.send("get all users");
}


const createNewUser = async (req, res) => {
    const result =  await db.insertData('users', {email:'nhan@gmail.com', password:123435786, name:'nhan', address:'duong 3/2, ninh kieu, cna tho'}); 
    res.json(result)
}

const getOne = async (req, res) => {
    const result =  await db.queryData('users', ['name','password'], {id:req.params.id});
    res.json(result);
}

module.exports = {
    getAll, createNewUser, getOne
};