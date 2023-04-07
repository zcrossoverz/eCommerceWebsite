import { ILike, MoreThan } from "typeorm";
import { AppDataSource } from "../database";
import { ProductOption } from "../entities/productOption.entity";
import { BadRequestError } from "../utils/error";
import { Brand } from "../entities/brand.entity";
import { Order } from "../entities/order.entity";
import { User } from "../entities/user.entity";
import { productRepository } from "./product.service";
import { getMonth, getYear } from "../utils/time";
import {
  EnumInventoryTransactionType,
  InventoryTransaction,
} from "../entities/inventoryTransaction.entity";

const productOptionRepo = AppDataSource.getRepository(ProductOption);
const orderRepo = AppDataSource.getRepository(Order);
const brandRepository = AppDataSource.getRepository(Brand);
const userRepo = AppDataSource.getRepository(User);
const inventoryTransactionRepo =
  AppDataSource.getRepository(InventoryTransaction);

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

  return await Promise.all(
    products_data.sort((a,b) => a.total_sale - b.total_sale).map(async (e) => {
      const product = await productRepository.findOne({
        where: {
          id: e.product_id 
        },
        relations: {
          brand: true
        }
      });
      if (!product) return BadRequestError("product id error");
      // console.log(product);

      // return {
      //   name: product.name,
      //   product_options: await Promise.all(e.product_options.map(async (el) => {
      //     const opt = await productOptionRepo.findOne({
      //       where:{

      //         id: el.product_option_id,
      //       },
      //       relations: {
      //         price: true,
      //         image: true
      //       },
      //       order: {
      //         price: {
      //           price: 'ASC'
      //         }
      //       }
      //     });
      //     return {
      //       color: opt?.color,
      //       ram: opt?.ram,
      //       rom: opt?.rom,
      //       sale_number: el.sale_number,
      //       amount: el.amount,
      //       price: opt?.price.price,
      //       image: opt?.image.image_url
      //     };
      //   })),
      //   rate: product.rate,
      //   total_sale: e.total_sale,
      // };

      const options = await productOptionRepo.findOne({
        where: {
          product: {
            id: product.id
          }
        },
        relations: {
          price: true,
          image: true,
        },
        order: {
          price: {
            price: "ASC",
          },
        },
      });

      return {
        id: product.id,
        name: product.name,
        rate: product.rate,
        image: options?.image.image_url,
        price: options?.price.price,
        brand: product.brand,
        total_sale: e.total_sale,
      };
    })
  );
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

enum monthToString {
  "Jan" = 1,
  "Feb" = 2,
  "Mar" = 3,
  "Apr" = 4,
  "May" = 5,
  "Jun" = 6,
  "Jul" = 7,
  "Aug" = 8,
  "Sep" = 9,
  "Oct" = 10,
  "Nov" = 11,
  "Dec" = 12,
}

export const getRevenue = async (value: string, key: string, explicit = 0) => {
  const relations = explicit
    ? {
        payment: true,
      }
    : {
        payment: true,
        orderItems: {
          product_option: {
            product: true,
          },
        },
      };
  const [orders, count] = await orderRepo.findAndCount({
    where: {
      createAt: ILike(`${value}%`),
      payment: {
        is_paid: true
      }
    },
    relations,
  });

  let amount = 0;

  orders.map((el) => {
    amount += Number(el.payment.amount);
  });

  return {
    total_order: count,
    month: key,
    amount,
  };
};

export const trackingProduct = async (time: string, explicit = 0) => {
  // const relations = explicit ? {
  //   payment: true,
  // } : {
  //   payment: true,
  //   orderItems: {
  //     product_option: {
  //       product: true
  //     }
  //   }
  // };
  const actions = await inventoryTransactionRepo.find({
    where: {
      date: ILike(`${time}%`),
    },
  });

  const tracking = {
    in: 0,
    out: 0,
  };

  actions.map((e) => {
    if (e.type === EnumInventoryTransactionType.IN) {
      tracking.in += e.quantity;
    }
    if (e.type === EnumInventoryTransactionType.OUT) {
      tracking.out += e.quantity;
    }
  });

  return {
    ...tracking,
  };
};

export const analysisSale = async () => {
  const months: { value: string; key: string }[] = [];
  for (let i = -6; i <= 0; i++) {
    const month = getMonth() + i;
    const year = getYear();
    if (i < 0) {
      months.push({
        value: `${month < 1 ? year - 1 : year}-${(
          "0" + (month < 1 ? month + 12 : month).toString()
        ).slice(-2)}`,
        key: `${monthToString[month < 1 ? month + 12 : month]}`,
      });
    } else {
      months.push({
        value: `${month > 12 ? year + 1 : year}-${(
          "0" + (month > 12 ? month - 12 : month).toString()
        ).slice(-2)}`,
        key: `${monthToString[month > 12 ? month - 12 : month]}`,
      });
    }
  }

  type statistic = {
    total_order: number;
    amount: number;
    month: string;
    _id: number;
  };

  const data: statistic[] = [];

  await Promise.all(
    months.map(async (e, i) => {
      return data.push({
        ...(await getRevenue(e.value, e.key)),
        ...(await trackingProduct(e.value)),
        _id: i,
      });
    })
  );

  return data.sort((a, b) => a._id - b._id);
};
