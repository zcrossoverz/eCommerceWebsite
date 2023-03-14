import { AppDataSource } from "../database";
import { EnumTypeImage, Image } from "../entities/image.entity";
import { Price } from "../entities/price.entity";
import { ProductOption } from "../entities/productOption.entity";
import { Warehouse } from "../entities/warehouse.entity";
import { BadRequestError } from "../utils/error";
import { failed, success } from "../utils/response";
import { productRepository } from "./product.service";

const productOptionRepository = AppDataSource.getRepository(ProductOption);

export interface ProductOptionInterface {
  color: string;
  ram: string;
  rom: string;
  price: number;
}

export const create = async (
  product_id: number,
  product_options: ProductOptionInterface,
  image_path: string
) => {
  const product = await productRepository.findOneBy({ id: product_id });
  if (!product) return BadRequestError("product not found");
  if (
    product_options.color &&
    product_options.ram &&
    product_options.rom &&
    product_options.price &&
    image_path
  ) {
    const { color, ram, rom, price } = product_options;

    // price
    const priceRepo = AppDataSource.getRepository(Price);
    const tempPrice = priceRepo.create({
      price: price,
    });
    const new_price = await priceRepo.save(tempPrice);

    const warehouseRepo = AppDataSource.getRepository(Warehouse);
    const imageRepo = AppDataSource.getRepository(Image);

    const new_options = productOptionRepository.create({
      color,
      ram,
      rom,
      price: new_price,
      product,
      warehouse: await warehouseRepo.save(warehouseRepo.create({ quantity: 0 })),
      image: await imageRepo.save(imageRepo.create({ type: EnumTypeImage.options, product: product, image_url: image_path }))
    });
    return await productOptionRepository.save(new_options);
  }
  return BadRequestError("please fill all the information");
};

export const deleteOne = async (id: number) => {
  const result = await productOptionRepository.delete({ id });
  return result.affected
    ? success()
    : failed();
};

export const updateOne = async (id: number, data: ProductOptionInterface) => {
  const option = await productOptionRepository.findOne({
    where: {
      id,
    },
    relations: {
      price: true,
    },
  });
  const { ram, rom, color, price } = data;
  if (!option) return BadRequestError("option not found");
  let price_update = 0;
  if (price) {
    const priceRepo = AppDataSource.getRepository(Price);
    await priceRepo.update({ id: option.price.id }, { price: (price) });
    price_update = 1;
  }
  return ram || rom || color
    ? {
        ...(await productOptionRepository.update({ id }, { ram, rom, color })),
        price_update,
      }
    : { price_update };
};

export const updateStock = async (id: number, quantity: number) => {
  const option = await productOptionRepository.findOne({
    where: {
      id,
    },
    relations: {
      warehouse: true,
    },
  });
  if (!option) return BadRequestError("option not found");
  const warehouseRepo = AppDataSource.getRepository(Warehouse);
  return (await warehouseRepo.update({ id: option.warehouse.id}, { quantity })).affected ? success() : failed();
};


