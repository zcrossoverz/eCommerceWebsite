import { AppDataSource } from "../database";
import { Brand } from "../entities/brand.entity";
import { Image, EnumTypeImage } from "../entities/image.entity";
import { Price } from "../entities/price.entity";
import { Product } from "../entities/product.entity";
import { ProductOption } from "../entities/productOption.entity";
import { Warehouse } from "../entities/warehouse.entity";
import { BadRequestError } from "../utils/error";
import { ProductOptionInterface } from "./productOption.service";

interface ProductInterface {
  name: string;
  description: string;
}

export const productRepository = AppDataSource.getRepository(Product);

export const getAll = async () => {
  const result = await productRepository.find({
    relations: {
      images: true,
      productOptions: {
        price: true
      },
      brand: true
    }
  });
  return result.length ? result.map(e => {
    return {
      id: e.id,
      name: e.description,
      description: e.description,
      images: e.images,
      brand: e.brand.name,
      product_options: e.productOptions.map(el => {
        return {
          product_option_id: el.id,
          price: el.price.price
        }
      })
    }
  }) : BadRequestError("product not found!");
};

export const create = async (
  product: ProductInterface,
  options: ProductOptionInterface,
  image_path: string,
  brand_id: number
) => {
  const { name: name, description: description } = product;
  const brandRepo = AppDataSource.getRepository(Brand);
  const brand = await brandRepo.findOneBy({ id: brand_id });
  if (!brand) return BadRequestError("brand not found");
  if (name) {
    const productExists = await productRepository.findOneBy({ name });
    if (productExists) return BadRequestError("product name already exists");
    const productObj = productRepository.create({ name, description, brand });
    const newProduct = await productRepository.save(productObj);

    const productOptionRepository = AppDataSource.getRepository(ProductOption);
    const { color, ram, rom, price } = options;

    // price
    const priceRepo = AppDataSource.getRepository(Price);
    const tempPrice = price
      ? priceRepo.create({
          price: String(price),
        })
      : priceRepo.create({
          price: "1000000",
        });
    const newPrice = await priceRepo.save(tempPrice);

    // init warehouse stock
    const warehouseRepo = AppDataSource.getRepository(Warehouse);
    const newWarehouse = await warehouseRepo.save(warehouseRepo.create({ quantity: 0 }));

    const opt =
      color && ram && rom
        ? productOptionRepository.create({
            color,
            ram,
            rom,
            product: newProduct,
            price: newPrice,
            warehouse: newWarehouse
          })
        : productOptionRepository.create({
            color: "black",
            ram: "8GB",
            rom: "128GB",
            product: newProduct,
            price: newPrice,
            warehouse: newWarehouse
          });

    const newOtp = await productOptionRepository.save(opt);

    const imageRepo = AppDataSource.getRepository(Image);
    const tempImage = imageRepo.create({
      image_url: image_path,
      product: newProduct,
      type: EnumTypeImage.thumbnail,
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
  const product = await productRepository.findOne({
    where: {
      id,
    },
    relations: {
      brand: true,
      specifications: true,
      images: true,
      productOptions: {
        price: true,
        warehouse: true
      },
    },
  });
  return product ? {
    id: product.id,
    name: product.name,
    description: product.description,
    createAt: product.createAt,
    updateAt: product.updateAt,
    brand: product.brand.name,
    brand_description: product.brand.description,
    specs: product.specifications.map(e => { 
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = e;
      return { ...rest };
    }),
    images: product.images,
    product_options: product.productOptions.map(e => {
      return {
        product_option_id: e.id,
        color: e.color,
        ram: e.ram,
        rom: e.rom,
        price: e.price.price,
        quantity: e.warehouse.quantity
      }
    })
  } : BadRequestError("product not found!");
};

// export const addBrand = async (id: number, brand_id: number) => {
//   const categoryRepository = AppDataSource.getRepository(Brand);

//   const brand = await categoryRepository.findOneBy({id:brand_id});
//   const product = await productRepository.findOneBy({id});
//   if(!product) return BadRequestError("product not found");
//   if(!brand) return BadRequestError("brand not found");
//   return await productRepository.update({id}, { brand });
// };

export const update = async (id: number, product: ProductInterface) => {
  const _product = await productRepository.findOneBy({ id });
  if (!_product) return BadRequestError("product not found!");
  return await productRepository.update({ id }, { ...product });
};

export const deleteOne = async (id: number) => {
  return await productRepository.delete({ id });
}