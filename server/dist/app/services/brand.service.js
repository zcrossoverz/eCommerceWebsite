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
exports.getAll = exports.deleteOne = exports.updateOne = exports.create = void 0;
const typeorm_1 = require("typeorm");
const database_1 = require("../database");
const brand_entity_1 = require("../entities/brand.entity");
const error_1 = require("../utils/error");
const brandRepository = database_1.AppDataSource.getRepository(brand_entity_1.Brand);
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = data;
    const name_exists = yield brandRepository.findOneBy({ name });
    if (name_exists)
        return (0, error_1.BadRequestError)("name already exists");
    if (!name || !description)
        return (0, error_1.BadRequestError)("please fill all information");
    const new_brand = brandRepository.create({ name, description });
    return yield brandRepository.save(new_brand);
});
exports.create = create;
const updateOne = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const brand = yield brandRepository.findOneBy({ id });
    if (!brand)
        return (0, error_1.BadRequestError)("brand not found");
    return yield brandRepository.update({ id }, Object.assign({}, data));
});
exports.updateOne = updateOne;
const deleteOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield brandRepository.delete({ id });
    return result.affected ? { msg: "delete success" } : { msg: "failed" };
});
exports.deleteOne = deleteOne;
const getAll = (search = undefined) => __awaiter(void 0, void 0, void 0, function* () {
    return yield brandRepository.find({
        where: {
            name: search !== undefined && search !== "" && search !== null
                ? (0, typeorm_1.ILike)(`%${search}%`)
                : undefined,
        },
    });
});
exports.getAll = getAll;
