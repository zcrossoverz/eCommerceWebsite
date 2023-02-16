import { AppDataSource } from "../database";
import { Category } from "../entities/category.entity";
import { BadRequestError } from "../utils/error";

const categoryRepository = AppDataSource.getRepository(Category);

export interface CategoryInterface {
  name: string;
  description: string;
}

export const create = async (data: CategoryInterface) => {
  const { name, description } = data;
  const name_exists = await categoryRepository.findOneBy({ name });
  if (name_exists) return BadRequestError("name already exists");
  if (!name || !description)
    return BadRequestError("please fill all information");
  const new_category = categoryRepository.create({ name, description });
  return await categoryRepository.save(new_category);
};

export const updateOne = async (id: number, data: CategoryInterface) => {
  const category = await categoryRepository.findOneBy({ id });
  if (!category) return BadRequestError("category not found");
  return await categoryRepository.update({ id }, { ...data });
};

export const deleteOne = async (id: number) => {
  const result = await categoryRepository.delete({ id });
  return result.affected
    ? { msg: "delete success" }
    : BadRequestError("category not found");
};

export const getAll = async () => {
  return await categoryRepository.find();
};
