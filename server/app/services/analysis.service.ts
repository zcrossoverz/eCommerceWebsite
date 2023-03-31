import { MoreThan } from "typeorm";
import { AppDataSource } from "../database";
import { ProductOption } from "../entities/productOption.entity";
import { BadRequestError } from "../utils/error";
import { Brand } from "../entities/brand.entity";
import { Order } from "../entities/order.entity";
import { User } from "../entities/user.entity";
import { productRepository } from "./product.service";

const productOptionRepo = AppDataSource.getRepository(ProductOption);
const orderRepo = AppDataSource.getRepository(Order);
const brandRepository = AppDataSource.getRepository(Brand);
const userRepo = AppDataSource.getRepository(User);

export const productInWarehouse = async (limit: number, page: number) => {
  const offset = (page - 1) * limit;
  const [data, count] = await productOptionRepo.findAndCount({
    where: {
      warehouse: {
        quantity: MoreThan(0),
      },
    },
    relations: {
      warehouse: true,
      image: true,
      product: true,
    },
    take: limit,
    skip: offset,
    order: {
      warehouse: {
        quantity: "DESC",
      },
    },
  });

  const last_page = Math.ceil(count / limit);
  const prev_page = page - 1 < 1 ? null : page - 1;
  const next_page = page + 1 > last_page ? null : page + 1;

  return count
    ? {
        current_page: page,
        prev_page,
        next_page,
        last_page,
        data_per_page: limit,
        total: count,
        data: data.map((e) => {
          return {
            product_option_id: e.id,
            quantity: e.warehouse.quantity,
            images: e.image?.image_url,
            name: e.product.name,
            ram: e.ram,
            rom: e.rom,
            color: e.color,
          };
        }),
      }
    : BadRequestError("warehouse empty");
};

export const countProduct = async () => {
  const data = await brandRepository.find({
    relations: {
      products: true,
    },
  });
  return data.map((e) => {
    return {
      name: e.name,
      product_number: e.products.length,
    };
  });
};

export const top_sale = async () => {
  const data = await orderRepo.find({
    relations: {
      orderItems: {
        product_option: {
          product: true,
          price: true,
        },
      },
    },
    take: 20,
  });

  interface product {
    product_id: number;

    product_options: {
      product_option_id: number;
      sale_number: number;
      amount: number;
    }[];
  }

  const products = [] as product[];

  data.map((order) => {
    order.orderItems.map((item) => {
      if (
        !products.find((el) => el.product_id === item.product_option.product.id)
      ) {
        products.push({
          product_id: item.product_option.product.id,
          product_options: [
            {
              product_option_id: item.product_option.id,
              sale_number: item.quantity,
              amount: item.quantity * item.product_option.price.price,
            },
          ],
        });
      } else {
        const product = products.at(
          products.findIndex(
            (el) => el.product_id === item.product_option.product.id
          )
        );
        if (
          !product?.product_options.find(
            (el) => el.product_option_id === item.product_option.id
          )
        ) {
          product?.product_options.push({
            product_option_id: item.product_option.id,
            sale_number: item.quantity,
            amount: item.quantity * item.product_option.price.price,
          });
        } else {
          product.product_options.filter(
            ({ product_option_id }) =>
              product_option_id === item.product_option.id
          )[0].sale_number += item.quantity;
          product.product_options.filter(
            ({ product_option_id }) =>
              product_option_id === item.product_option.id
          )[0].amount += item.quantity * item.product_option.price.price;
        }
      }
    });
  });

  const products_data = products.map((e) => {
    let total = 0;
    e.product_options.map((el) => {
      total += el.sale_number;
    });
    return {
      ...e,
      total_sale: total,
    };
  });

  return Promise.all(products_data.map(async (e) => {
    const product = await productRepository.findOneBy({ id: e.product_id });
    if (!product) return BadRequestError("product id error");
    return {
      name: product.name,
      product_options: e.product_options.map(async (el) => {
        const opt = await productOptionRepo.findOneBy({
          id: el.product_option_id,
        });
        return {
          color: opt?.color,
          ram: opt?.ram,
          rom: opt?.rom,
          sale_number: el.sale_number,
          amount: el.amount,
        };
      }),
      total_sale: e.total_sale,
    };
  }));

};

export const analysOverview = async () => {
  const countUsers = await userRepo.count();
  const countOrders = await orderRepo.count();
  const countProducts = await productRepository.count();
  const countBrands = await brandRepository.count();
  return {
    countUsers,
    countOrders,
    countProducts,
    countBrands,
  };
};

export const analysisPrices = async (product_option_id: number) => {
  const product_option = await productOptionRepo.findOne({
    where: {
      id: product_option_id,
    },
    relations: {
      price: {
        priceHistories: true,
      },
    },
    order: {
      price: {
        priceHistories: {
          id: "DESC",
        },
      },
    },
  });
  if (!product_option) return BadRequestError("product option not found");
  return product_option.price.priceHistories;
};
