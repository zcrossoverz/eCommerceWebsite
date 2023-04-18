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
exports.canRate = exports.addImages = exports.deleteOne = exports.update = exports.getOneById = exports.create = exports.getAll = exports.productRepository = void 0;
const typeorm_1 = require("typeorm");
const database_1 = require("../database");
const brand_entity_1 = require("../entities/brand.entity");
const image_entity_1 = require("../entities/image.entity");
const price_entity_1 = require("../entities/price.entity");
const product_entity_1 = require("../entities/product.entity");
const productOption_entity_1 = require("../entities/productOption.entity");
const warehouse_entity_1 = require("../entities/warehouse.entity");
const error_1 = require("../utils/error");
const response_1 = require("../utils/response");
const workQueue_entity_1 = require("../entities/workQueue.entity");
const priceHistoty_entity_1 = require("../entities/priceHistoty.entity");
exports.productRepository = database_1.AppDataSource.getRepository(product_entity_1.Product);
const getAll = (limit, page, filter = null, search = undefined, order) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = ((page ? page : 1) - 1) * limit;
    const [result, count] = yield exports.productRepository.findAndCount({
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
            rate: (filter === null || filter === void 0 ? void 0 : filter.rate) ? `${filter.rate}` : undefined,
            name: search !== undefined && search !== "" && search !== null
                ? (0, typeorm_1.ILike)(`%${search}%`)
                : undefined,
            brand: {
                id: (filter === null || filter === void 0 ? void 0 : filter.brand_id) ? filter.brand_id : undefined,
            },
            productOptions: {
                price: {
                    price: (filter === null || filter === void 0 ? void 0 : filter.price.min) && (filter === null || filter === void 0 ? void 0 : filter.price.max)
                        ? (0, typeorm_1.And)((0, typeorm_1.MoreThanOrEqual)(filter === null || filter === void 0 ? void 0 : filter.price.min), (0, typeorm_1.LessThanOrEqual)(filter === null || filter === void 0 ? void 0 : filter.price.max))
                        : undefined,
                },
            },
        },
        order: {
            id: order === 'newest' ? 'DESC' : 'ASC'
        }
    });
    const last_page = Math.ceil(count / limit);
    const prev_page = page - 1 < 1 ? null : page - 1;
    const next_page = page + 1 > last_page ? null : page + 1;
    return result.length
        ? Object.assign(Object.assign({ current_page: page, prev_page,
            next_page,
            last_page, data_per_page: limit, total: count }, (search !== undefined &&
            search !== "" &&
            search !== null && { search_query: search })), { rate_filter: filter === null || filter === void 0 ? void 0 : filter.rate, data: result.map((e) => {
                return {
                    id: e.id,
                    name: e.name,
                    description: e.description,
                    images: e.images.find((e) => e.type === image_entity_1.EnumTypeImage.thumbnail),
                    brand: e.brand.name,
                    rate: e.rate,
                    product_options: e.productOptions.map((el) => {
                        return {
                            product_option_id: el.id,
                            price: el.price.price,
                        };
                    }),
                };
            }) }) : (0, error_1.BadRequestError)("product not found!");
});
exports.getAll = getAll;
const create = (product, options, image_path, brand_id) => __awaiter(void 0, void 0, void 0, function* () {
    const { name: name, description: description } = product;
    const brandRepo = database_1.AppDataSource.getRepository(brand_entity_1.Brand);
    const brand = yield brandRepo.findOneBy({ id: brand_id });
    if (!brand)
        return (0, error_1.BadRequestError)("brand not found");
    if (name) {
        const productExists = yield exports.productRepository.findOneBy({ name });
        if (productExists)
            return (0, error_1.BadRequestError)("product name already exists");
        const productObj = exports.productRepository.create({ name, description, brand });
        const newProduct = yield exports.productRepository.save(productObj);
        const productOptionRepository = database_1.AppDataSource.getRepository(productOption_entity_1.ProductOption);
        const { color, ram, rom, price } = options;
        const priceRepo = database_1.AppDataSource.getRepository(price_entity_1.Price);
        const tempPrice = price
            ? priceRepo.create({
                price: price,
            })
            : priceRepo.create({
                price: 1000000,
            });
        const newPrice = yield priceRepo.save(tempPrice);
        const priceHistoryRepo = database_1.AppDataSource.getRepository(priceHistoty_entity_1.PriceHistory);
        yield priceHistoryRepo.save(priceHistoryRepo.create({
            old_price: price,
            new_price: price,
            price: newPrice
        }));
        const warehouseRepo = database_1.AppDataSource.getRepository(warehouse_entity_1.Warehouse);
        const newWarehouse = yield warehouseRepo.save(warehouseRepo.create({ quantity: 0 }));
        const imageRepo = database_1.AppDataSource.getRepository(image_entity_1.Image);
        const tempImage = imageRepo.create({
            image_url: image_path,
            product: newProduct,
            type: image_entity_1.EnumTypeImage.thumbnail,
        });
        const newImage = yield imageRepo.save(tempImage);
        const image_opt = yield imageRepo.save(imageRepo.create({
            image_url: image_path,
            product: newProduct,
            type: image_entity_1.EnumTypeImage.options,
        }));
        const opt = color && ram && rom
            ? productOptionRepository.create({
                color,
                ram,
                rom,
                product: newProduct,
                price: newPrice,
                warehouse: newWarehouse,
                image: image_opt,
            })
            : productOptionRepository.create({
                color: "black",
                ram: "8GB",
                rom: "128GB",
                product: newProduct,
                price: newPrice,
                warehouse: newWarehouse,
                image: image_opt,
            });
        const newOtp = yield productOptionRepository.save(opt);
        return {
            new_product: newProduct,
            new_options: newOtp,
            new_image: newImage,
        };
    }
    return (0, error_1.BadRequestError)("missing information!");
});
exports.create = create;
const getOneById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield exports.productRepository.findOne({
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
                image: true,
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
            brand_id: product.brand.id,
            brand_description: product.brand.description,
            rate: product.rate,
            feedback: product.feedbacks.map((e) => {
                return Object.assign({}, e);
            }),
            specs: product.specifications.map((e) => {
                return Object.assign({}, e);
            }),
            images: product.images.filter((e) => e.type === image_entity_1.EnumTypeImage.desc),
            product_options: product.productOptions.map((e) => {
                return {
                    product_option_id: e.id,
                    color: e.color,
                    ram: e.ram,
                    rom: e.rom,
                    price: e.price.price,
                    quantity: e.warehouse.quantity,
                    image: e.image,
                };
            }),
        }
        : (0, error_1.BadRequestError)("product not found!");
});
exports.getOneById = getOneById;
const update = (id, product, brand_id = -1) => __awaiter(void 0, void 0, void 0, function* () {
    const _product = yield exports.productRepository.findOne({
        where: {
            id
        },
        relations: {
            brand: true
        }
    });
    if (!_product)
        return (0, error_1.BadRequestError)("product not found!");
    const brandRepo = database_1.AppDataSource.getRepository(brand_entity_1.Brand);
    const brand = yield brandRepo.findOneBy({ id: brand_id !== -1 ? brand_id : _product.brand.id });
    if (!brand)
        return (0, error_1.BadRequestError)("error when retrieve brand");
    return (yield exports.productRepository.update({ id }, Object.assign(Object.assign({}, product), { brand }))).affected
        ? (0, response_1.success)()
        : (0, response_1.failed)();
});
exports.update = update;
const deleteOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield exports.productRepository.delete({ id })).affected
        ? (0, response_1.success)()
        : (0, response_1.failed)();
});
exports.deleteOne = deleteOne;
const addImages = (product_id, image) => __awaiter(void 0, void 0, void 0, function* () {
    const imageRepo = database_1.AppDataSource.getRepository(image_entity_1.Image);
    const product = yield exports.productRepository.findOneBy({ id: product_id });
    if (!product)
        return (0, error_1.BadRequestError)("product not found");
    if (!image.length)
        return (0, error_1.BadRequestError)("image empty");
    return yield Promise.all(image.map((e) => {
        return imageRepo.save(imageRepo.create({
            type: image_entity_1.EnumTypeImage.desc,
            image_url: e,
            product: product,
        }));
    }));
});
exports.addImages = addImages;
const canRate = (product_id, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const workRepo = database_1.AppDataSource.getRepository(workQueue_entity_1.WorkQueue);
    const data = yield workRepo.findOneBy({
        product: {
            id: product_id,
        },
        user: {
            id: user_id,
        },
    });
    return data && data.type === workQueue_entity_1.EnumWorkQueueType.RATE
        ? {
            can_rate: true,
            is_done: data.is_done,
        }
        : {
            can_rate: false,
        };
});
exports.canRate = canRate;
