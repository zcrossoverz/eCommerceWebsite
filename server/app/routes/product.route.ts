/* eslint-disable no-useless-escape */
import * as product from "../controllers/product.controller";
import express, { Express } from "express";
import upload from "../middlewares/upload";
import * as validation from "../middlewares/validation";

export const ProductRoutes = (app: Express) => {
    const router = express.Router();


    router.get(/^\/get_all(\?)?(((limit=[0-9]+)|(page=[0-9]+)|(brand_id=[0-9]+)|(price_min=[0-9]+)|(price_max=[0-9]+)|(rate=[0-9]+))?(\%26)?){2}$/, product.getAll);
    /*
     get_all?limit=10&page=2 => 10 product per page, return page 2
     get_all => page = 1, limit = 10
     get_all?page=2 => page = 2, limit = 10

     filter option : 
     brand_id={number}
     price_min={number}&price_max={number}
     rate={number}
    */
    router.post("/", [upload.single('image'), validation.validateImageExtension], product.create);
    router.post("/add_images/:id", [upload.array('image', 5), validation.validateImageExtension], product.addImages);
    router.get("/:id(\\d+)", product.getOneById);
    router.put("/:id", product.update);
    router.delete("/:id", product.deleteOne);

    app.use("/api/product", router);
}