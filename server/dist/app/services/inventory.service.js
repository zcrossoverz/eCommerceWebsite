"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllInboundNote = exports.deleteInboundNote = exports.processInboundNote = exports.getInboundNote = exports.createWarehouseInboundNote = exports.decreaseStock = exports.increaseStock = void 0;
const database_1 = require("../database");
const inventoryInboundNote_entity_1 = require("../entities/inventoryInboundNote.entity");
const inventoryTransaction_entity_1 = require("../entities/inventoryTransaction.entity");
const orderItem_entity_1 = require("../entities/orderItem.entity");
const productOption_entity_1 = require("../entities/productOption.entity");
const warehouse_entity_1 = require("../entities/warehouse.entity");
const error_1 = require("../utils/error");
const response_1 = require("../utils/response");
const warehouseRepo = database_1.AppDataSource.getRepository(warehouse_entity_1.Warehouse);
const productOptionRepo = database_1.AppDataSource.getRepository(productOption_entity_1.ProductOption);
const inventoryTransactionRepo = database_1.AppDataSource.getRepository(inventoryTransaction_entity_1.InventoryTransaction);
const increaseStock = (product_option_id, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productOptionRepo.findOne({
        where: {
            id: product_option_id,
        },
        relations: {
            warehouse: true,
            price: true,
        },
    });
    if (!product)
        return (0, error_1.BadRequestError)("product not found");
    const product_in_warehouse = yield warehouseRepo.findOneBy({
        id: product.warehouse.id,
    });
    if (!product_in_warehouse)
        return (0, error_1.BadRequestError)("product not found in warehouse");
    if (!quantity || Number(quantity) < 0)
        return (0, error_1.BadRequestError)("quantity not valid");
    yield inventoryTransactionRepo.save(inventoryTransactionRepo.create({
        quantity: quantity,
        product_option: product,
        type: inventoryTransaction_entity_1.EnumInventoryTransactionType.IN,
        amount: String(product.price.price),
    }));
    product_in_warehouse.quantity += quantity;
    return yield warehouseRepo.save(product_in_warehouse);
});
exports.increaseStock = increaseStock;
const decreaseStock = (product_option_id, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productOptionRepo.findOne({
        where: {
            id: product_option_id,
        },
        relations: {
            warehouse: true,
            price: true,
        },
    });
    if (!product)
        return (0, error_1.BadRequestError)("product not found");
    const product_in_warehouse = yield warehouseRepo.findOneBy({
        id: product.warehouse.id,
    });
    if (!product_in_warehouse)
        return (0, error_1.BadRequestError)("product not found in warehouse");
    if (!quantity ||
        Number(quantity) < 0 ||
        Number(quantity) > product_in_warehouse.quantity)
        return (0, error_1.BadRequestError)("quantity not valid");
    yield inventoryTransactionRepo.save(inventoryTransactionRepo.create({
        quantity: quantity,
        product_option: product,
        type: inventoryTransaction_entity_1.EnumInventoryTransactionType.OUT,
        amount: String(product.price.price),
    }));
    product_in_warehouse.quantity -= quantity;
    return yield warehouseRepo.save(product_in_warehouse);
});
exports.decreaseStock = decreaseStock;
const createWarehouseInboundNote = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data)
        return (0, error_1.BadRequestError)("data error");
    const orderItemRepo = database_1.AppDataSource.getRepository(orderItem_entity_1.OrderItem);
    const inventoryNoteRepo = database_1.AppDataSource.getRepository(inventoryInboundNote_entity_1.InventoryInboundNote);
    const productRepo = database_1.AppDataSource.getRepository(productOption_entity_1.ProductOption);
    const note = yield inventoryNoteRepo.save(inventoryNoteRepo.create({
        status: inventoryInboundNote_entity_1.EnumInventoryInboundStatus.PENDING,
    }));
    data.reduce((acc, cur) => {
        const existingData = acc.find(data => data.product_option_id === cur.product_option_id);
        if (existingData) {
            existingData.quantity += cur.quantity;
        }
        else {
            acc.push(cur);
        }
        return acc;
    }, []).forEach((e) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield productRepo.findOne({
            where: {
                id: e.product_option_id
            },
            relations: {
                price: true
            }
        });
        if (product) {
            yield orderItemRepo.insert(orderItemRepo.create({
                quantity: e.quantity,
                product_option: product,
                inventoryInboundNote: note,
                price: product.price.price
            }));
        }
    }));
    return note;
});
exports.createWarehouseInboundNote = createWarehouseInboundNote;
const getInboundNote = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const inventoryNoteRepo = database_1.AppDataSource.getRepository(inventoryInboundNote_entity_1.InventoryInboundNote);
    const note = yield inventoryNoteRepo.findOne({
        where: {
            id,
        },
        relations: {
            orderItems: {
                product_option: {
                    product: true,
                    image: true
                },
            },
        },
    });
    return note ? {
        id: note.id,
        status: inventoryInboundNote_entity_1.EnumInventoryInboundStatus[note.status],
        create_at: note.create_at,
        items: note.orderItems.map((e) => {
            return {
                name: e.product_option.product.name,
                product_option_id: e.id,
                quantity: e.quantity,
                ram: e.product_option.ram,
                rom: e.product_option.rom,
                color: e.product_option.rom,
                image: e.product_option.image.image_url
            };
        })
    } : (0, error_1.BadRequestError)("inventory inbound note not found");
});
exports.getInboundNote = getInboundNote;
const processInboundNote = (id, accept) => __awaiter(void 0, void 0, void 0, function* () {
    const inventoryNoteRepo = database_1.AppDataSource.getRepository(inventoryInboundNote_entity_1.InventoryInboundNote);
    const note = yield inventoryNoteRepo.findOne({
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
    if (!note)
        return (0, error_1.BadRequestError)("inventory inbound note not found");
    if (inventoryInboundNote_entity_1.EnumInventoryInboundStatus[note.status] === "PENDING") {
        if (accept) {
            yield inventoryNoteRepo.update({ id }, { status: inventoryInboundNote_entity_1.EnumInventoryInboundStatus.COMPLETED });
            note.orderItems.forEach((e) => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, exports.increaseStock)(e.product_option.id, e.quantity);
            }));
            return (0, response_1.success)();
        }
        else {
            yield inventoryNoteRepo.update({ id }, { status: inventoryInboundNote_entity_1.EnumInventoryInboundStatus.CANCELLED });
            return {
                message: "rejected"
            };
        }
    }
    return {
        message: "item has been processed"
    };
});
exports.processInboundNote = processInboundNote;
const deleteInboundNote = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const inventoryNoteRepo = database_1.AppDataSource.getRepository(inventoryInboundNote_entity_1.InventoryInboundNote);
    return (yield inventoryNoteRepo.delete({ id })).affected ? { msg: "success" } : { msg: "failed" };
});
exports.deleteInboundNote = deleteInboundNote;
const getAllInboundNote = (limit, page) => __awaiter(void 0, void 0, void 0, function* () {
    const inventoryNoteRepo = database_1.AppDataSource.getRepository(inventoryInboundNote_entity_1.InventoryInboundNote);
    const offset = (page - 1) * limit;
    const [rs, count] = yield inventoryNoteRepo.findAndCount({
        relations: {
            orderItems: {
                product_option: {
                    product: true,
                    price: true
                }
            }
        },
        take: limit,
        skip: offset
    });
    const last_page = Math.ceil(count / limit);
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
                status: inventoryInboundNote_entity_1.EnumInventoryInboundStatus[e.status],
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
            };
        })
    } : (0, error_1.BadRequestError)("inbound note empty");
});
exports.getAllInboundNote = getAllInboundNote;
