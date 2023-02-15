import { AppDataSource } from "../database";
import { ProductOption } from "../entities/productOption.entity";
import { BadRequestError } from "../utils/error";
import { productRepository } from "./product.service";

const productOptionRepository = AppDataSource.getRepository(ProductOption);

export interface ProductOptionInterface {
    color: string,
    ram: string,
    rom: string,
    price: number
}

export const create = async (product_id: number, product_options: ProductOptionInterface) => {
    const product = await productRepository.findOneBy({id: product_id});
    if(!product) return BadRequestError("product not found");
    if(product_options.color && product_options.ram && product_options.rom && product_options.price){
        const new_options = productOptionRepository.create({
            ...product_options,
            product
        });
        return await productOptionRepository.save(new_options);
    }
    return BadRequestError("please fill all the information");

};

export const deleteOne = async (id: number) => {
    const result = await productOptionRepository.delete({id});
    return result.affected ? { msg:"delete success" } : BadRequestError("option not found");
}