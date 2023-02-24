import { AppDataSource } from "../database";
import { Brand } from "../entities/brand.entity";
import { Image, TypeImage } from "../entities/image.entity";
import { Product } from "../entities/product.entity";
import { ProductOption } from "../entities/productOption.entity";
import { BadRequestError } from "../utils/error";
import { ProductOptionInterface } from "./productOption.service";

interface ProductInterface {
  name: string;
  description: string;
};


export const productRepository = AppDataSource.getRepository(Product);

export const getAll = async () => {
  const result = await productRepository.find();
  return result.length ? result : BadRequestError("product not found!");
};

export const create = async (
  product: ProductInterface,
  options: ProductOptionInterface,
  image_path: string
) => {
  const { name: name, description: description } = product;

  if (name) {
    const productExists = await productRepository.findOneBy({ name });
    if (productExists) return BadRequestError("product name already exists");
    const productObj = productRepository.create({ name, description });
    const newProduct = await productRepository.save(productObj);

    const productOptionRepository = AppDataSource.getRepository(ProductOption);
    const { color, ram, rom, price } = options;
    const opt =
      color && ram && rom && price
        ? productOptionRepository.create({
            color,
            ram,
            rom,
            price,
            product: newProduct,
          })
        : productOptionRepository.create({
            color: "black",
            ram: "8GB",
            rom: "128GB",
            price: 1000000,
            product: newProduct,
          });

    const newOtp = await productOptionRepository.save(opt);

    const imageRepo = AppDataSource.getRepository(Image);
    const tempImage = imageRepo.create({
      image_url: image_path,
      product: newProduct,
      type: TypeImage.thumbnail,
    });
    const newImage = await imageRepo.save(tempImage);
    return {
      new_product: newProduct,
      new_options: newOtp,
      new_image: newImage,
    };
  }

  return BadRequestError("missing information!");
};

export const getOneById = async (id: number) => {
  const product = productRepository.findOne({
    where: {
      id,
    },
    relations: {
      brand: true,
      specifications: true,
      images: true,
      productOptions: true,
    },
  });
  return (await product) ? product : BadRequestError("product not found!");
};

export const addBrand = async (id: number, brand_id: number) => {
  const categoryRepository = AppDataSource.getRepository(Brand);

  const brand = await categoryRepository.findOneBy({id:brand_id});
  const product = await productRepository.findOneBy({id});
  if(!product) return BadRequestError("product not found");
  if(!brand) return BadRequestError("brand not found");
  return await productRepository.update({id}, { brand });
}

export const update = async (
  id: number,
  product: ProductInterface
) => {
  const _product = await productRepository.findOneBy({id});
  if(!_product) return BadRequestError("product not found!");
  return await productRepository.update({id}, {...product});
};