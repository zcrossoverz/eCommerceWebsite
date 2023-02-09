const user = require("../controllers/user.controller");
import express, { Express } from "express";

export const UserRoutes = (app: Express) => {
    let router = express.Router();

    router.get("/", user.getAll);
    router.post("/", user.createNewUser);
    router.get("/:id", user.getOne);
    router.get("/:id/update", user.updateOne); // test
    router.get("/:id/delete", user.deleteOne);
    router.get("/join", user.testJoin)

    app.use("/api/user", router);
}