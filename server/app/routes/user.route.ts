/* eslint-disable no-useless-escape */
import * as user from "../controllers/user.controller";
import express, { Express } from "express";
import * as validation from "../middlewares/validation";
import * as auth from "../middlewares/auth";

export const UserRoutes = (app: Express) => {
    const router = express.Router();

    router.get(/^\/get_all(\?)?(((limit=[0-9])|(page=[0-9]))?(\%26)?){2}$/, user.getAll);
    router.post("/", [validation.validateEmail, validation.validatePhoneNumber], user.createNew);
    router.get("/:id(\\d+)", user.getOne);
    router.put("/:id", [validation.validateEmail, validation.validatePhoneNumber, auth.verifyToken()], user.updateOne); 
    router.post("/:id/add_address", [auth.verifyToken()], user.addAddress);
    router.patch("/:id/set_default_address", [auth.verifyToken()], user.setDefaultAddress);
    router.patch("/change_password", auth.verifyToken(), user.changePassword);
    router.put("/:id_user/update_address/:id_address", auth.verifyToken(), user.updateAddress);
    router.delete("/:id", [auth.verifyToken(), auth.require_admin()], user.deleteOne);
    router.delete("/:id_user/delete_address/:id_address", auth.verifyToken(),user.deleteAddress);


    app.use("/api/user", router);
}