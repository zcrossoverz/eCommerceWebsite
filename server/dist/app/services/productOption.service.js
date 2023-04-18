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
exports.updatePrice = exports.updateStock = exports.updateOne = exports.deleteOne = exports.create = void 0;
const database_1 = require("../database");
const image_entity_1 = require("../entities/image.entity");
const price_entity_1 = require("../entities/price.entity");
const priceHistoty_entity_1 = require("../entities/priceHistoty.entity");
const productOption_entity_1 = require("../entities/productOption.entity");
const warehouse_entity_1 = require("../entities/warehouse.entity");
const error_1 = require("../utils/error");
const response_1 = require("../utils/response");
const product_service_1 = require("./product.service");
const productOptionRepository = database_1.AppDataSource.getRepository(productOption_entity_1.ProductOption);
const create = (product_id, product_options, image_path) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_service_1.productRepository.findOneBy({ id: product_id });
    if (!product)
        return (0, error_1.BadRequestError)("product not found");
    if (product_options.color &&
        product_options.ram &&
        product_options.rom &&
        product_options.price &&
        image_path) {
        const { color, ram, rom, price } = product_options;
        const priceRepo = database_1.AppDataSource.getRepository(price_entity_1.Price);
        const priceHistoryRepo = database_1.AppDataSource.getRepository(priceHistoty_entity_1.PriceHistory);
        const tempPrice = priceRepo.create({
            price: price,
        });
        const new_price = yield priceRepo.save(tempPrice);
        yield priceHistoryRepo.save(priceHistoryRepo.create({
            old_price: price,
            new_price: price,
            price: new_price
        }));
        const warehouseRepo = database_1.AppDataSource.getRepository(warehouse_entity_1.Warehouse);
        const imageRepo = database_1.AppDataSource.getRepository(image_entity_1.Image);
        const new_options = productOptionRepository.create({
            color,
            ram,
            rom,
            price: new_price,
            product,
            warehouse: yield warehouseRepo.save(warehouseRepo.create({ quantity: 0 })),
            image: yield imageRepo.save(imageRepo.create({ type: image_entity_1.EnumTypeImage.options, product: product, image_url: image_path }))
        });
        return yield productOptionRepository.save(new_options);
    }
    return (0, error_1.BadRequestError)("please fill all the information");
});
exports.create = create;
const deleteOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productOptionRepository.delete({ id });
    return result.affected
        ? (0, response_1.success)()
        : (0, response_1.failed)();
});
exports.deleteOne = deleteOne;
const updateOne = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const option = yield productOptionRepository.findOne({
        where: {
            id,
        },
        relations: {
            price: true,
        },
    });
    const { ram, rom, color, price } = data;
    if (!option)
        return (0, error_1.BadRequestError)("option not found");
    let price_update = 0;
    if (price) {
        const priceRepo = database_1.AppDataSource.getRepository(price_entity_1.Price);
        const priceHistoty = database_1.AppDataSource.getRepository(priceHistoty_entity_1.PriceHistory);
        yield priceHistoty.save(priceHistoty.create({
            old_price: option.price.price,
            new_price: price,
            price: option.price
        }));
        yield priceRepo.update({ id: option.price.id }, { price: (price) });
        price_update = 1;
    }
    return ram || rom || color
        ? Object.assign(Object.assign({}, (yield productOptionRepository.update({ id }, { ram, rom, color }))), { price_update }) : { price_update };
});
exports.updateOne = updateOne;
const updateStock = (id, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const option = yield productOptionRepository.findOne({
        where: {
            id,
        },
        relations: {
            warehouse: true,
        },
    });
    if (!option)
        return (0, error_1.BadRequestError)("option not found");
    const warehouseRepo = database_1.AppDataSource.getRepository(warehouse_entity_1.Warehouse);
    return (yield warehouseRepo.update({ id: option.warehouse.id }, { quantity })).affected ? (0, response_1.success)() : (0, response_1.failed)();
});
exports.updateStock = updateStock;
const updatePrice = (product_option_id, price) => __awaiter(void 0, void 0, void 0, function* () {
    if (!price)
        return (0, error_1.BadRequestError)("new price empty");
    const priceRepo = database_1.AppDataSource.getRepository(price_entity_1.Price);
    const priceHistoryRepo = database_1.AppDataSource.getRepository(priceHistoty_entity_1.PriceHistory);
    const productOption = yield productOptionRepository.findOne({
        where: {
            id: product_option_id
        },
        relations: {
            price: true
        }
    });
    if (!productOption)
        return (0, error_1.BadRequestError)("product option not found");
    yield priceHistoryRepo.save(priceHistoryRepo.create({
        old_price: productOption.price.price,
        new_price: price,
        price: productOption.price
    }));
    return (yield priceRepo.update({ id: productOption.price.id }, { price })).affected ? (0, response_1.success)() : (0, response_1.failed)();
});
exports.updatePrice = updatePrice;
