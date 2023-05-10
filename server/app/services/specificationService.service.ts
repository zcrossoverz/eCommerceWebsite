import { AppDataSource } from "../database";
import { Specification } from "../entities/specification.entity";
import { BadRequestError } from "../utils/error";
import { failed, success } from "../utils/response";
import { productRepository } from "./product.service";

const specificationRepository = AppDataSource.getRepository(Specification);

export interface SpecificationInterface {
  key: string;
  value: string;
}

export const create = async (
  product_id: number,
  spec: SpecificationInterface[]
) => {
  const product = await productRepository.findOneBy({ id: product_id });
  if (!product) return BadRequestError("product not found");
  const new_specs: Specification[] = [];
  if (spec.length) {
    await Promise.all(
      spec.map(async (e) => {
        if (!e.key || !e.value)
          return BadRequestError("please fill all the information");
        const new_spec = specificationRepository.create({
          ...e,
          product,
        });

        return new_specs.push(await specificationRepository.save(new_spec));
      })
    );
    return new_specs;
  }
  return BadRequestError("data empty");
};

export const deleteOne = async (id: number) => {
  const result = await specificationRepository.delete({ id });
  return result.affected ? success() : failed();
};

export const updateOne = async (id: number, data: SpecificationInterface) => {
  const spec = await specificationRepository.findOneBy({ id });
  if (!spec) return BadRequestError("option not found");
  return (await specificationRepository.update({ id }, { ...data })).affected
    ? success()
    : failed();
};
