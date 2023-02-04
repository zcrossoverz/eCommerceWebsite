const user = require("../controllers/user.controller");
const express = require("express");

module.exports = (app) => {
    let router = express.Router();

    router.get("/", user.getAll);
    router.get("/add", user.createNewUser); // test
    router.get("/:id", user.getOne);; // test
    router.get("/:id/update", user.updateOne); // test
    router.get("/:id/delete", user.deleteOne);
    router.get("/join", user.testJoin)

    app.use("/api/user", router);
}