const order = require("../controllers/order.controller");
const express = require("express");

module.exports = (app) => {
    let router = express.Router();

    router.get("/", order.getAll);

    app.use("/api/order", router);
}