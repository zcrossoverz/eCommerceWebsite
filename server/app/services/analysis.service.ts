import { MoreThan } from "typeorm";
import { AppDataSource } from "../database";
import { ProductOption } from "../entities/productOption.entity";
import { BadRequestError } from "../utils/error";
import { Brand } from "../entities/brand.entity";
// import { Order } from "../entities/order.entity";

const productOptionRepo = AppDataSource.getRepository(ProductOption);
// const orderRepo = AppDataSource.getRepository(Order);
const brandRepository = AppDataSource.getRepository(Brand);
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

// export const top_10_sale = async () => {
//   const data = await orderRepo.find({
//     relations: {
//         orderItems: {
//             product_option: {
//                 product: true
//             }
//         }
//     },
//     order: {
        
//     }
//   })

  
// };
