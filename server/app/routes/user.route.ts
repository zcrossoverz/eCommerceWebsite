import * as user from "../controllers/user.controller";
import express, { Express } from "express";
import * as validation from "../middlewares/validation";

export const UserRoutes = (app: Express) => {
    const router = express.Router();

    router.get("/", user.getAll);
    router.post("/", [validation.validateEmail, validation.validatePhoneNumber], user.createNew);
    router.get("/:id", user.getOne);
    router.put("/:id", [validation.validateEmail, validation.validatePhoneNumber], user.updateOne); 
    router.post("/:id/add_address", user.addAddress);
    router.patch("/:id/set_default_address", user.setDefaultAddress);
    router.put("/update_address/:id_address", user.updateAddress);
    router.delete("/:id", user.deleteOne);


    app.use("/api/user", router);
}