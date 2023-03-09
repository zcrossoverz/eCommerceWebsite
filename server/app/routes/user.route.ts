/* eslint-disable no-useless-escape */
import * as user from "../controllers/user.controller";
import express, { Express } from "express";
import * as validation from "../middlewares/validation";

export const UserRoutes = (app: Express) => {
    const router = express.Router();

    router.get(/^\/get_all(\?)?(((limit=[0-9])|(page=[0-9]))?(\%26)?){2}$/, user.getAll);
    router.post("/", [validation.validateEmail, validation.validatePhoneNumber], user.createNew);
    router.get("/:id(/^([0-9]){1,}$/)", user.getOne);
    router.put("/:id", [validation.validateEmail, validation.validatePhoneNumber], user.updateOne); 
    router.post("/:id/add_address", user.addAddress);
    router.patch("/:id/set_default_address", user.setDefaultAddress);
    router.put("/:id_user/update_address/:id_address", user.updateAddress);
    router.delete("/:id", user.deleteOne);
    router.delete("/:id_user/delete_address/:id_address", user.deleteAddress);


    app.use("/api/user", router);
}