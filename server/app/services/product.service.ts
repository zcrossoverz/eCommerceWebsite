import { And, ILike, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { AppDataSource } from "../database";
import { Brand } from "../entities/brand.entity";
import { Image, EnumTypeImage } from "../entities/image.entity";
import { Price } from "../entities/price.entity";
import { Product } from "../entities/product.entity";
import { ProductOption } from "../entities/productOption.entity";
import { Warehouse } from "../entities/warehouse.entity";
import { BadRequestError } from "../utils/error";
import { failed, success } from "../utils/response";
import { ProductOptionInterface } from "./productOption.service";

interface ProductInterface {
  name: string;
  description: string;
}

export const productRepository = AppDataSource.getRepository(Product);

interface FilterProduct {
  brand_id: number | undefined;
  price: {
    min: number | undefined;
    max: number | undefined;
  };
  rate: number | undefined;
}

export const getAll = async (
  limit: number,
  page: number,
  filter: FilterProduct | null = null,
  search: string | undefined = undefined
) => {
  
  const offset = (page - 1) * limit;
  const [result, count] = await productRepository.findAndCount({
    relations: {
      images: true,
      productOptions: {
        price: true,
      },
      brand: true,
      feedbacks: true,
    },
    take: limit,
    skip: offset,
    where: {
      name: (search !== undefined && search !== "" && search !== null) ? ILike(`%${search}%`) : undefined,
      brand: {
        id: filter?.brand_id ? filter.brand_id : undefined,
      },
      productOptions: {
        price: {
          price:
            filter?.price.min && filter?.price.max
              ? And(
                  MoreThanOrEqual(filter?.price.min),
                  LessThanOrEqual(filter?.price.max)
                )
              : undefined,
        },
      },
    },
  });
  const last_page = Math.ceil(count / limit);
  const prev_page = page - 1 < 1 ? null : page - 1;
  const next_page = page + 1 > last_page ? null : page + 1;
  return result.length
    ? filter?.rate
      ? {
          current_page: page,
          prev_page,
          next_page,
          last_page,
          data_per_page: limit,
          total: count,
          ...(search !== undefined && search !== "" && search !== null && {search_query:search}),
          rate_filter: filter?.rate,
          data: result
            .filter(
              (e) =>
                (e.feedbacks.length
                  ? (
                      e.feedbacks.reduce((acc, cur) => acc + cur.rate, 0) /
                      e.feedbacks.length
                    ).toFixed(1)
                  : 0) === filter?.rate
            )
            .map((e) => {
              return {
                id: e.id,
                name: e.name,
                description: e.description,
                images: e.images,
                brand: e.brand.name,
                rate: e.feedbacks.length
                  ? (
                      e.feedbacks.reduce((acc, cur) => acc + cur.rate, 0) /
                      e.feedbacks.length
                    ).toFixed(1)
                  : 0,
                product_options: e.productOptions.map((el) => {
                  return {
                    product_option_id: el.id,
                    price: el.price.price,
                  };
                }),
              };
            }),
        }
      : {
          current_page: page,
          prev_page,
          next_page,
          last_page,
          data_per_page: limit,
          ...(search !== undefined && search !== "" && search !== null && {search_query:search}),
          total: count,
          data: result.map((e) => {
            return {
              id: e.id,
              name: e.name,
              description: e.description,
              images: e.images,
              brand: e.brand.name,
              rate: e.feedbacks.length
                ? (
                    e.feedbacks.reduce((acc, cur) => acc + cur.rate, 0) /
                    e.feedbacks.length
                  ).toFixed(1)
                : 0,
              product_options: e.productOptions.map((el) => {
                return {
                  product_option_id: el.id,
                  price: el.price.price,
                };
              }),
            };
          }),
        }
    : BadRequestError("product not found!");
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
          price: price,
        })
      : priceRepo.create({
          price: 1_000_000,
        });
    const newPrice = await priceRepo.save(tempPrice);

    // init warehouse stock
    const warehouseRepo = AppDataSource.getRepository(Warehouse);
    const newWarehouse = await warehouseRepo.save(
      warehouseRepo.create({ quantity: 0 })
    );

    const opt =
      color && ram && rom
        ? productOptionRepository.create({
            color,
            ram,
            rom,
            product: newProduct,
            price: newPrice,
            warehouse: newWarehouse,
          })
        : productOptionRepository.create({
            color: "black",
            ram: "8GB",
            rom: "128GB",
            product: newProduct,
            price: newPrice,
            warehouse: newWarehouse,
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
        warehouse: true,
      },
      feedbacks: true,
    },
  });
  return product
    ? {
        id: product.id,
        name: product.name,
        description: product.description,
        createAt: product.createAt,
        updateAt: product.updateAt,
        brand: product.brand.name,
        brand_description: product.brand.description,
        rate: product.feedbacks.length
          ? (
              product.feedbacks.reduce((acc, cur) => acc + cur.rate, 0) /
              product.feedbacks.length
            ).toFixed(1)
          : 0,
        feedback: product.feedbacks.map((e) => {
          return {
            ...e,
          };
        }),
        specs: product.specifications.map((e) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id, ...rest } = e;
          return { ...rest };
        }),
        images: product.images,
        product_options: product.productOptions.map((e) => {
          return {
            product_option_id: e.id,
            color: e.color,
            ram: e.ram,
            rom: e.rom,
            price: e.price.price,
            quantity: e.warehouse.quantity,
          };
        }),
      }
    : BadRequestError("product not found!");
};

export const update = async (id: number, product: ProductInterface) => {
  const _product = await productRepository.findOneBy({ id });
  if (!_product) return BadRequestError("product not found!");
  return (await productRepository.update({ id }, { ...product })).affected
    ? success()
    : failed();
};

export const deleteOne = async (id: number) => {
  return (await productRepository.delete({ id })).affected
    ? success()
    : failed();
};

export const addImages = async (order_id: number, image: string[]) => {
  const imageRepo = AppDataSource.getRepository(Image);
  const product = await productRepository.findOneBy({ id: order_id });
  if (!product) return BadRequestError("product not found");
  if (!image.length) return BadRequestError("image empty");
  const rs = await Promise.all(
    image.map((e) => {
      return imageRepo.save(
        imageRepo.create({
          type: EnumTypeImage.desc,
          image_url: e,
          product: product,
        })
      );
    })
  );
  return rs;
};
