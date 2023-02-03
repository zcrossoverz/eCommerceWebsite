const user = require("../controllers/user.controller");
const express = require("express");

module.exports = (app) => {
    let router = express.Router();

    router.get("/", user.getAll);

    app.use("/api/user", router);
}