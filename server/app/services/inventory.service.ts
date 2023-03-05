import { AppDataSource } from "../database"
import { ProductOption } from "../entities/productOption.entity";
import { Warehouse } from "../entities/warehouse.entity"
import { BadRequestError } from "../utils/error";

const warehouseRepo = AppDataSource.getRepository(Warehouse);
const productOptionRepo = AppDataSource.getRepository(ProductOption);

export const increaseStock = async (product_option_id: number, quantity: number) => {
    const product = await productOptionRepo.findOne({ 
        where: {
            id: product_option_id
        },
        relations: {
            warehouse: true
        }
     });
    if(!product) return BadRequestError("product not found");
    const product_in_warehouse = await warehouseRepo.findOneBy({ id: product.warehouse.id });
    if(!product_in_warehouse) return BadRequestError("product not found in warehouse");
    if(!quantity || Number(quantity) < 0) return BadRequestError("quantity not valid");
    product_in_warehouse.quantity += quantity;
    return await warehouseRepo.save(product_in_warehouse);
};

export const decreaseStock = async (product_option_id: number, quantity: number) => {
    const product = await productOptionRepo.findOne({ 
        where: {
            id: product_option_id
        },
        relations: {
            warehouse: true
        }
     });
    if(!product) return BadRequestError("product not found");
    const product_in_warehouse = await warehouseRepo.findOneBy({ id: product.warehouse.id });
    if(!product_in_warehouse) return BadRequestError("product not found in warehouse");
    if(!quantity || Number(quantity) < 0) return BadRequestError("quantity not valid");
    product_in_warehouse.quantity -= quantity;
    return await warehouseRepo.save(product_in_warehouse);
};