import { AppDataSource } from "../database";
import {
  EnumInventoryInboundStatus,
  InventoryInboundNote,
} from "../entities/inventoryInboundNote.entity";
import {
  EnumInventoryTransactionType,
  InventoryTransaction,
} from "../entities/inventoryTransaction.entity";
import { OrderItem } from "../entities/orderItem.entity";
import { ProductOption } from "../entities/productOption.entity";
import { Warehouse } from "../entities/warehouse.entity";
import { BadRequestError } from "../utils/error";

const warehouseRepo = AppDataSource.getRepository(Warehouse);
const productOptionRepo = AppDataSource.getRepository(ProductOption);
const inventoryTransactionRepo =
  AppDataSource.getRepository(InventoryTransaction);

export const increaseStock = async (
  product_option_id: number,
  quantity: number
) => {
  const product = await productOptionRepo.findOne({
    where: {
      id: product_option_id,
    },
    relations: {
      warehouse: true,
      price: true,
    },
  });
  if (!product) return BadRequestError("product not found");
  const product_in_warehouse = await warehouseRepo.findOneBy({
    id: product.warehouse.id,
  });
  if (!product_in_warehouse)
    return BadRequestError("product not found in warehouse");
  if (!quantity || Number(quantity) < 0)
    return BadRequestError("quantity not valid");
  await inventoryTransactionRepo.save(
    inventoryTransactionRepo.create({
      quantity: quantity,
      product_option: product,
      type: EnumInventoryTransactionType.IN,
      amount: String(product.price.price),
    })
  );
  product_in_warehouse.quantity += quantity;
  return await warehouseRepo.save(product_in_warehouse);
};

export const decreaseStock = async (
  product_option_id: number,
  quantity: number
) => {
  const product = await productOptionRepo.findOne({
    where: {
      id: product_option_id,
    },
    relations: {
      warehouse: true,
      price: true,
    },
  });
  if (!product) return BadRequestError("product not found");
  const product_in_warehouse = await warehouseRepo.findOneBy({
    id: product.warehouse.id,
  });
  if (!product_in_warehouse)
    return BadRequestError("product not found in warehouse");
  if (
    !quantity ||
    Number(quantity) < 0 ||
    Number(quantity) > product_in_warehouse.quantity
  )
    return BadRequestError("quantity not valid");
  await inventoryTransactionRepo.save(
    inventoryTransactionRepo.create({
      quantity: quantity,
      product_option: product,
      type: EnumInventoryTransactionType.OUT,
      amount: String(product.price.price),
    })
  );
  product_in_warehouse.quantity -= quantity;
  return await warehouseRepo.save(product_in_warehouse);
};

interface dataInboundNote {
  quantity: number;
  product_option_id: number;
}

export const createWarehouseInboundNote = async (data: dataInboundNote[]) => {
  if (!data) return BadRequestError("data error");
  const orderItemRepo = AppDataSource.getRepository(OrderItem);
  const inventoryNoteRepo = AppDataSource.getRepository(InventoryInboundNote);
  const productRepo = AppDataSource.getRepository(ProductOption);
  const note = await inventoryNoteRepo.save(
    inventoryNoteRepo.create({
      status: EnumInventoryInboundStatus.PENDING,
    })
  );
  data.forEach(async (e) => {
    const product = await productRepo.findOneBy({ id: e.product_option_id });
    if (product) {
      await orderItemRepo.insert(
        orderItemRepo.create({
          quantity: e.quantity,
          product_option: product,
          inventoryInboundNote: note,
        })
      );
    }
  });
  return note;
};

export const getInboundNote = async (id: number) => {
  const inventoryNoteRepo = AppDataSource.getRepository(InventoryInboundNote);
  const note = await inventoryNoteRepo.findOne({
    where: {
      id,
    },
    relations: {
      orderItems: {
        product_option: {
          product: true,
        },
      },
    },
  });
  return note ? {
        id: note.id,
        status: EnumInventoryInboundStatus[note.status],
        create_at: note.create_at,
        items: note.orderItems.map((e) => {
            return {
              name: e.product_option.product.name,
              product_option_id: e.id,
              quantity: e.quantity,
              ram: e.product_option.ram,
              rom: e.product_option.rom,
              color: e.product_option.rom,
            };
          })
        } : BadRequestError("inventory inbound note not found");
};

export const processInboundNote = async (id: number, accept: boolean) => {
    const inventoryNoteRepo = AppDataSource.getRepository(InventoryInboundNote);
    const note = await inventoryNoteRepo.findOne({
        where: {
            id
        },
        relations: {
            orderItems: {
              product_option: {
                product: true,
              },
            },
        },
    });
    if(!note) return BadRequestError("inventory inbound note not found");
    if(EnumInventoryInboundStatus[note.status] === "PENDING"){
        if(accept){
            await inventoryNoteRepo.update({ id }, { status: EnumInventoryInboundStatus.COMPLETED });
            note.orderItems.forEach(async e => {
                await increaseStock(e.product_option.id, e.quantity);
            });
            return {
                msg: "success"
            };
        }else{
            await inventoryNoteRepo.update({ id }, { status: EnumInventoryInboundStatus.CANCELLED });
            return {
                msg: "rejected"
            }
        }
    }
    return {
        msg: "item has been processed"
    };
};

export const deleteInboundNote = async (id: number) => {
  const inventoryNoteRepo = AppDataSource.getRepository(InventoryInboundNote);
  return (await inventoryNoteRepo.delete({id})).affected ? { msg: "success" } : { msg: "failed" };
};

export const getAllInboundNote = async (limit: number, page: number) => {
  const inventoryNoteRepo = AppDataSource.getRepository(InventoryInboundNote);
  const offset = (page-1)*limit;
  const [rs, count] = await inventoryNoteRepo.findAndCount({
    relations: {
      orderItems: {
        product_option: {
          product: true
        }
      }
    },
    take: limit,
    skip: offset
  });
  const last_page = Math.ceil(count/limit);
  const prev_page = page - 1 < 1 ? null : page - 1;
  const next_page = page + 1 > last_page ? null : page + 1;
  return count ? {
    current_page: page,
    prev_page, next_page, last_page,
    data_per_page: limit,
    total: count,
    data: rs.map(e => {
    return {
      id: e.id,
      status: EnumInventoryInboundStatus[e.status],
      create_at: e.create_at,
      items: e.orderItems.map((el) => {
        return {
          name: el.product_option.product.name,
          product_option_id: el.id,
          quantity: el.quantity,
          ram: el.product_option.ram,
          rom: el.product_option.rom,
          color: el.product_option.rom,
        };
      })
      }
    })} : BadRequestError("inbound note empty");
}