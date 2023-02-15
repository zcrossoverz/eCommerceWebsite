import { AppDataSource } from "../database";
import { Specification } from "../entities/specification.entity";
import { BadRequestError } from "../utils/error";
import { productRepository } from "./product.service";

const specificationRepository = AppDataSource.getRepository(Specification);

interface SpecificationInterface {
    key: string,
    value: string
}

export const create = async (product_id: number, spec: SpecificationInterface) => {
    const product = await productRepository.findOneBy({id:product_id});
    if(!product) return BadRequestError("product not found");
    if(spec.key && spec.value){
        const new_spec = specificationRepository.create({
            ...spec,
            product
        });

        return await specificationRepository.save(new_spec);
    }
    return BadRequestError("please fill all the information");
};

export const deleteOne = async (id: number) => {
    const result = await specificationRepository.delete({id});
    return result.affected ? { msg:"delete success" } : BadRequestError("option not found");
};

export const updateOne = async (id: number, data: SpecificationInterface) => {
    const spec = await specificationRepository.findOneBy({id});
    if(!spec) return BadRequestError("option not found");
    return await specificationRepository.update({id}, {...data});
};
