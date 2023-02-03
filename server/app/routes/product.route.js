const product = require("../controllers/product.controller");
const express = require("express");

module.exports = (app) => {
    let router = express.Router();

    router.get("/", product.getAll);
 
    app.use("/api/product", router);
}