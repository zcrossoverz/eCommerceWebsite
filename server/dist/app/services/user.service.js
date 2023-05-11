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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.deleteAddress = exports.updateAddress = exports.setDefaultAddress = exports.addAddress = exports.findOneByEmail = exports.getAll = exports.deleteOne = exports.updateOne = exports.getOne = exports.create = exports.userRepository = void 0;
const database_1 = require("../database");
const user_entity_1 = require("../entities/user.entity");
const error_1 = require("../utils/error");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const address_entity_1 = require("../entities/address.entity");
const response_1 = require("../utils/response");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["MEMBER"] = "member";
})(UserRole || (UserRole = {}));
exports.userRepository = database_1.AppDataSource.getRepository(user_entity_1.User);
const addressRepository = database_1.AppDataSource.getRepository(address_entity_1.Address);
const create = ({ email, password, firstName, lastName, phone, }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email)
        return (0, error_1.BadRequestError)("email cannot empty!");
    if (!password)
        return (0, error_1.BadRequestError)("password cannot empty!");
    const emailExists = yield exports.userRepository.findOneBy({ email: email });
    if (emailExists)
        return (0, error_1.BadRequestError)("email already exists!");
    if (phone) {
        const phoneExists = yield exports.userRepository.findOneBy({ phone: phone });
        if (phoneExists)
            return (0, error_1.BadRequestError)("phone number already exists!");
    }
    const passwordHash = bcryptjs_1.default.hashSync(password, 8);
    const newUser = exports.userRepository.create({
        email,
        password: passwordHash,
        firstName,
        lastName,
        phone,
    });
    return yield exports.userRepository.save(newUser);
});
exports.create = create;
const getOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exports.userRepository.findOne({
        where: {
            id
        },
        relations: {
            address: true
        }
    });
    return result ? result : (0, error_1.BadRequestError)("user not found!");
});
exports.getOne = getOne;
const updateOne = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield exports.userRepository.findOneBy({ id });
    if (!findUser)
        return (0, error_1.BadRequestError)("user not found!");
    const { email, phone, password } = user;
    if (email) {
        const emailExists = yield exports.userRepository.findOneBy({ email });
        if (emailExists)
            return (0, error_1.BadRequestError)("email already exists!");
    }
    if (phone) {
        const phoneExists = yield exports.userRepository.findOneBy({ phone });
        if (phoneExists)
            return (0, error_1.BadRequestError)("phone number already exists!");
    }
    if (password) {
        user.password = bcryptjs_1.default.hashSync(password, 8);
    }
    return (yield exports.userRepository.update({ id }, user)).affected ? (0, response_1.success)() : (0, response_1.failed)();
});
exports.updateOne = updateOne;
const deleteOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield exports.userRepository.findOneBy({ id });
    if (!findUser)
        return (0, error_1.BadRequestError)("user not found!");
    return yield exports.userRepository.delete({ id });
});
exports.deleteOne = deleteOne;
const getAll = (limit, page) => __awaiter(void 0, void 0, void 0, function* () {
    const offset = (page - 1) * limit;
    const [result, count] = yield exports.userRepository.findAndCount({
        take: limit,
        skip: offset
    });
    const last_page = Math.ceil(count / limit);
    const prev_page = page - 1 < 1 ? null : page - 1;
    const next_page = page + 1 > last_page ? null : page + 1;
    return result.length ? {
        current_page: page,
        prev_page, next_page, last_page,
        data_per_page: limit,
        total: count,
        data: result
    } : (0, error_1.BadRequestError)("user not found!");
});
exports.getAll = getAll;
const findOneByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exports.userRepository.findOneBy({ email });
    return result ? result : (0, error_1.BadRequestError)("user not found!");
});
exports.findOneByEmail = findOneByEmail;
const addAddress = (id, addr) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield exports.userRepository.findOne({
        where: {
            id
        },
        relations: {
            address: true
        }
    });
    if (!addr)
        return (0, error_1.BadRequestError)("address empty");
    if (!user)
        return (0, error_1.BadRequestError)("user not found!");
    const new_addr = addressRepository.create({
        address: addr,
        user: user
    });
    const rs = yield addressRepository.save(new_addr);
    const { default_address } = user;
    if (!default_address)
        yield exports.userRepository.update({ id }, { default_address: rs.id });
    const { id: id_addr, address } = rs;
    return {
        id: id_addr, address
    };
});
exports.addAddress = addAddress;
const setDefaultAddress = (id_user, id_addr) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield exports.userRepository.findOne({
        where: {
            id: id_user
        },
        relations: {
            address: true
        }
    });
    if (!user)
        return (0, error_1.BadRequestError)("user not found!");
    if (user.address.find(({ id }) => id === id_addr)) {
        return (yield exports.userRepository.update({ id: id_user }, { default_address: id_addr })).affected ? (0, response_1.success)() : (0, response_1.failed)();
    }
    return (0, error_1.BadRequestError)("id address not found");
});
exports.setDefaultAddress = setDefaultAddress;
const updateAddress = (id_user, id_addr, addr) => __awaiter(void 0, void 0, void 0, function* () {
    const address = yield addressRepository.findOne({
        where: {
            id: id_addr
        },
        relations: {
            user: true
        }
    });
    if (!address)
        return (0, error_1.BadRequestError)("address not found");
    if (address.user.id !== id_user)
        return (0, error_1.BadRequestError)("you dont have this address id");
    if (!addr)
        return (0, error_1.BadRequestError)("address empty");
    return (yield addressRepository.update({ id: id_addr }, { address: addr })).affected ? (0, response_1.success)() : (0, response_1.failed)();
});
exports.updateAddress = updateAddress;
const deleteAddress = (id_user, id_addr) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const address = yield addressRepository.findOneBy({ id: id_addr });
    const user = yield exports.userRepository.findOne({
        where: {
            id: id_user
        },
        relations: {
            address: true
        }
    });
    if (!address)
        return (0, error_1.BadRequestError)("address not found");
    if (!user)
        return (0, error_1.BadRequestError)("user not found");
    let deleted = false;
    let index = 0;
    for (const { id } of user.address) {
        if (id === id_addr) {
            if (user.default_address === id) {
                user.address.splice(index, 1);
                if (user.address.length)
                    yield exports.userRepository.update({ id: id_user }, { default_address: (_a = user.address.at(0)) === null || _a === void 0 ? void 0 : _a.id });
                else
                    yield exports.userRepository.update({ id: id_user }, { default_address: 0 });
            }
            yield addressRepository.delete({ id });
            deleted = true;
        }
        index++;
    }
    if (deleted)
        return (0, response_1.success)();
    else
        return (0, error_1.BadRequestError)("you dont have this address id");
});
exports.deleteAddress = deleteAddress;
const changePassword = (id, old_password, new_password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield exports.userRepository.findOneBy({ id });
    if (!old_password || !new_password)
        return (0, error_1.BadRequestError)("password cannot empty");
    if (!user)
        return (0, error_1.BadRequestError)("error when retrieve user data");
    if (!bcryptjs_1.default.compareSync(old_password, user.password))
        return (0, error_1.BadRequestError)("old password is not correct");
    return (yield exports.userRepository.update({ id }, { password: bcryptjs_1.default.hashSync(new_password, 8) })).affected ? (0, response_1.success)() : (0, response_1.failed)();
});
exports.changePassword = changePassword;
