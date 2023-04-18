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
exports.updateOne = exports.deleteOne = exports.create = void 0;
const database_1 = require("../database");
const specification_entity_1 = require("../entities/specification.entity");
const error_1 = require("../utils/error");
const response_1 = require("../utils/response");
const product_service_1 = require("./product.service");
const specificationRepository = database_1.AppDataSource.getRepository(specification_entity_1.Specification);
const create = (product_id, spec) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_service_1.productRepository.findOneBy({ id: product_id });
    if (!product)
        return (0, error_1.BadRequestError)("product not found");
    const new_specs = [];
    if (spec.length) {
        yield Promise.all(spec.map((e) => __awaiter(void 0, void 0, void 0, function* () {
            if (!e.key || !e.value)
                return (0, error_1.BadRequestError)("please fill all the information");
            const new_spec = specificationRepository.create(Object.assign(Object.assign({}, e), { product }));
            return new_specs.push(yield specificationRepository.save(new_spec));
        })));
        return new_specs;
    }
    return (0, error_1.BadRequestError)("data empty");
});
exports.create = create;
const deleteOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield specificationRepository.delete({ id });
    return result.affected
        ? (0, response_1.success)()
        : (0, response_1.failed)();
});
exports.deleteOne = deleteOne;
const updateOne = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const spec = yield specificationRepository.findOneBy({ id });
    if (!spec)
        return (0, error_1.BadRequestError)("option not found");
    return (yield specificationRepository.update({ id }, Object.assign({}, data))).affected ? (0, response_1.success)() : (0, response_1.failed)();
});
exports.updateOne = updateOne;
