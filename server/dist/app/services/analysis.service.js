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
exports.productAnalysis = exports.reportInventory = exports.reportRevenue = exports.analysisSale = exports.trackingProduct = exports.getRevenue = exports.analysisPrices = exports.analysOverview = exports.top_sale = exports.countProduct = exports.productInWarehouse = void 0;
const typeorm_1 = require("typeorm");
const database_1 = require("../database");
const productOption_entity_1 = require("../entities/productOption.entity");
const error_1 = require("../utils/error");
const brand_entity_1 = require("../entities/brand.entity");
const order_entity_1 = require("../entities/order.entity");
const user_entity_1 = require("../entities/user.entity");
const product_service_1 = require("./product.service");
const time_1 = require("../utils/time");
const inventoryTransaction_entity_1 = require("../entities/inventoryTransaction.entity");
const productOptionRepo = database_1.AppDataSource.getRepository(productOption_entity_1.ProductOption);
const orderRepo = database_1.AppDataSource.getRepository(order_entity_1.Order);
const brandRepository = database_1.AppDataSource.getRepository(brand_entity_1.Brand);
const userRepo = database_1.AppDataSource.getRepository(user_entity_1.User);
const inventoryTransactionRepo = database_1.AppDataSource.getRepository(inventoryTransaction_entity_1.InventoryTransaction);
const productInWarehouse = (limit, page, search = undefined) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = (page - 1) * limit;
    const [data, count] = yield productOptionRepo.findAndCount({
        where: {
            warehouse: {
                quantity: (0, typeorm_1.MoreThan)(0),
            },
            product: {
                name: search !== undefined && search !== "" && search !== null
                    ? (0, typeorm_1.ILike)(`%${search}%`)
                    : undefined,
            },
        },
        relations: {
            warehouse: true,
            image: true,
            product: true,
            price: true,
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
    return count && data.length > 0
        ? {
            current_page: page,
            prev_page,
            next_page,
            last_page,
            data_per_page: limit,
            total: count,
            data: data.map((e) => {
                var _a;
                return {
                    product_option_id: e.id,
                    quantity: e.warehouse.quantity,
                    images: (_a = e.image) === null || _a === void 0 ? void 0 : _a.image_url,
                    name: e.product.name,
                    ram: e.ram,
                    rom: e.rom,
                    color: e.color,
                    price: e.price.price,
                };
            }),
        }
        : (0, error_1.BadRequestError)("not found product");
});
exports.productInWarehouse = productInWarehouse;
const countProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield brandRepository.find({
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
});
exports.countProduct = countProduct;
const top_sale = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield orderRepo.find({
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
    const products = [];
    data.map((order) => {
        order.orderItems.map((item) => {
            if (!products.find((el) => el.product_id === item.product_option.product.id)) {
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
            }
            else {
                const product = products.at(products.findIndex((el) => el.product_id === item.product_option.product.id));
                if (!(product === null || product === void 0 ? void 0 : product.product_options.find((el) => el.product_option_id === item.product_option.id))) {
                    product === null || product === void 0 ? void 0 : product.product_options.push({
                        product_option_id: item.product_option.id,
                        sale_number: item.quantity,
                        amount: item.quantity * item.product_option.price.price,
                    });
                }
                else {
                    product.product_options.filter(({ product_option_id }) => product_option_id === item.product_option.id)[0].sale_number += item.quantity;
                    product.product_options.filter(({ product_option_id }) => product_option_id === item.product_option.id)[0].amount += item.quantity * item.product_option.price.price;
                }
            }
        });
    });
    const products_data = products.map((e) => {
        let total = 0;
        e.product_options.map((el) => {
            total += el.sale_number;
        });
        return Object.assign(Object.assign({}, e), { total_sale: total });
    });
    return yield Promise.all(products_data
        .sort((a, b) => a.total_sale - b.total_sale)
        .map((e) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield product_service_1.productRepository.findOne({
            where: {
                id: e.product_id,
            },
            relations: {
                brand: true,
            },
        });
        if (!product)
            return (0, error_1.BadRequestError)("product id error");
        const options = yield productOptionRepo.findOne({
            where: {
                product: {
                    id: product.id,
                },
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
            image: options === null || options === void 0 ? void 0 : options.image.image_url,
            price: options === null || options === void 0 ? void 0 : options.price.price,
            brand: product.brand,
            total_sale: e.total_sale,
        };
    })));
});
exports.top_sale = top_sale;
const analysOverview = () => __awaiter(void 0, void 0, void 0, function* () {
    const countUsers = yield userRepo.count();
    const countOrders = yield orderRepo.count();
    const countProducts = yield product_service_1.productRepository.count();
    const countBrands = yield brandRepository.count();
    return {
        countUsers,
        countOrders,
        countProducts,
        countBrands,
    };
});
exports.analysOverview = analysOverview;
const analysisPrices = (product_option_id) => __awaiter(void 0, void 0, void 0, function* () {
    const product_option = yield productOptionRepo.findOne({
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
    if (!product_option)
        return (0, error_1.BadRequestError)("product option not found");
    return product_option.price.priceHistories;
});
exports.analysisPrices = analysisPrices;
var monthToString;
(function (monthToString) {
    monthToString[monthToString["Jan"] = 1] = "Jan";
    monthToString[monthToString["Feb"] = 2] = "Feb";
    monthToString[monthToString["Mar"] = 3] = "Mar";
    monthToString[monthToString["Apr"] = 4] = "Apr";
    monthToString[monthToString["May"] = 5] = "May";
    monthToString[monthToString["Jun"] = 6] = "Jun";
    monthToString[monthToString["Jul"] = 7] = "Jul";
    monthToString[monthToString["Aug"] = 8] = "Aug";
    monthToString[monthToString["Sep"] = 9] = "Sep";
    monthToString[monthToString["Oct"] = 10] = "Oct";
    monthToString[monthToString["Nov"] = 11] = "Nov";
    monthToString[monthToString["Dec"] = 12] = "Dec";
})(monthToString || (monthToString = {}));
const getRevenue = (value, key, explicit = 0) => __awaiter(void 0, void 0, void 0, function* () {
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
    const [orders, count] = yield orderRepo.findAndCount({
        where: {
            createAt: (0, typeorm_1.ILike)(`${value}%`),
            payment: {
                is_paid: true,
            },
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
});
exports.getRevenue = getRevenue;
const trackingProduct = (time, explicit = 0) => __awaiter(void 0, void 0, void 0, function* () {
    const actions = yield inventoryTransactionRepo.find({
        where: {
            date: (0, typeorm_1.ILike)(`${time}%`),
        },
    });
    const tracking = {
        in: 0,
        out: 0,
    };
    actions.map((e) => {
        if (e.type === inventoryTransaction_entity_1.EnumInventoryTransactionType.IN) {
            tracking.in += e.quantity;
        }
        if (e.type === inventoryTransaction_entity_1.EnumInventoryTransactionType.OUT) {
            tracking.out += e.quantity;
        }
    });
    return Object.assign({}, tracking);
});
exports.trackingProduct = trackingProduct;
const analysisSale = () => __awaiter(void 0, void 0, void 0, function* () {
    const months = [];
    for (let i = -6; i <= 0; i++) {
        const month = (0, time_1.getMonth)() + i;
        const year = (0, time_1.getYear)();
        if (i < 0) {
            months.push({
                value: `${month < 1 ? year - 1 : year}-${("0" + (month < 1 ? month + 12 : month).toString()).slice(-2)}`,
                key: `${monthToString[month < 1 ? month + 12 : month]}`,
            });
        }
        else {
            months.push({
                value: `${month > 12 ? year + 1 : year}-${("0" + (month > 12 ? month - 12 : month).toString()).slice(-2)}`,
                key: `${monthToString[month > 12 ? month - 12 : month]}`,
            });
        }
    }
    const data = [];
    yield Promise.all(months.map((e, i) => __awaiter(void 0, void 0, void 0, function* () {
        return data.push(Object.assign(Object.assign(Object.assign({}, (yield (0, exports.getRevenue)(e.value, e.key))), (yield (0, exports.trackingProduct)(e.value))), { _id: i }));
    })));
    return data.sort((a, b) => a._id - b._id);
});
exports.analysisSale = analysisSale;
const reportRevenue = (startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    const dates = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    for (let i = 0; i <= daysDiff; i++) {
        const date = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const formattedDate = `${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`;
        dates.push(formattedDate);
    }
    const dataz = [];
    yield Promise.all(dates.map((e, i) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield orderRepo.find({
            where: {
                createAt: (0, typeorm_1.ILike)(`_____${e}%`),
                payment: {
                    is_paid: true,
                },
            },
            relations: {
                orderItems: {
                    product_option: true,
                },
                payment: true,
            },
        });
        const data_sale = {
            revenue: 0,
            product_sale: 0,
        };
        data.map((el) => {
            data_sale.revenue += Number(el.payment.amount);
            el.orderItems.map((elm) => {
                data_sale.product_sale += elm.quantity;
            });
        });
        dataz.push(Object.assign({ id: i, date: e }, data_sale));
    })));
    return dataz.sort((a, b) => a.id - b.id);
});
exports.reportRevenue = reportRevenue;
const reportInventory = (startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
    const dates = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    for (let i = 0; i <= daysDiff; i++) {
        const date = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const formattedDate = `${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`;
        dates.push(formattedDate);
    }
    const _data = [];
    yield Promise.all(dates.map((e, i) => __awaiter(void 0, void 0, void 0, function* () {
        const inventoryTransactionRepo = database_1.AppDataSource.getRepository(inventoryTransaction_entity_1.InventoryTransaction);
        const transactions = yield inventoryTransactionRepo.find({
            where: {
                date: (0, typeorm_1.ILike)(`_____${e}%`),
            },
            relations: {
                product_option: true,
            },
        });
        const data = {
            in: 0,
            out: 0,
        };
        transactions.map((el) => {
            if (el.type === inventoryTransaction_entity_1.EnumInventoryTransactionType.IN)
                data.in += el.quantity;
            if (el.type === inventoryTransaction_entity_1.EnumInventoryTransactionType.OUT)
                data.out += el.quantity;
        });
        _data.push(Object.assign({ id: i, date: e }, data));
    })));
    return _data.sort((a, b) => a.id - b.id);
});
exports.reportInventory = reportInventory;
const productAnalysis = (product_option_id) => __awaiter(void 0, void 0, void 0, function* () {
    const productRepo = database_1.AppDataSource.getRepository(productOption_entity_1.ProductOption);
    const product = yield productRepo.findOne({
        where: {
            id: product_option_id,
        },
        relations: {
            product: true,
            price: {
                priceHistories: true,
            },
            inventory_transactions: true,
        },
    });
    if (!product)
        return (0, error_1.BadRequestError)("product not found");
    return {
        name: product.product.name,
        prices: product.price.priceHistories,
        transactions: product.inventory_transactions,
    };
});
exports.productAnalysis = productAnalysis;
