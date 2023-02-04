const user = require("../controllers/user.controller");
const express = require("express");

module.exports = (app) => {
    let router = express.Router();

    router.get("/", user.getAll);
    router.get("/add", user.createNewUser); // test
    router.get("/:id", user.getOne);; // test

    app.use("/api/user", router);
}