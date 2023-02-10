import * as user from "../controllers/user.controller";
import express, { Express } from "express";
import * as validation from "../middlewares/validation";

export const UserRoutes = (app: Express) => {
    let router = express.Router();

    router.get("/", user.getAll);
    router.post("/", [validation.validateEmail, validation.validatePhoneNumber], user.createNew);
    router.get("/:id", user.getOne);
    router.put("/:id", [validation.validateEmail, validation.validatePhoneNumber], user.updateOne); 
    router.delete("/:id", user.deleteOne);


    app.use("/api/user", router);
}