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
exports.require_admin = exports.verifyToken = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const database_1 = require("../database");
const user_entity_1 = require("../entities/user.entity");
passport_1.default.use("authz", new passport_jwt_1.Strategy({
    secretOrKey: process.env.JWT_SECRET_KEY,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
}, (payload, done) => {
    const { user_id, role } = payload;
    if (!user_id || !role) {
        return done("token is not valid!");
    }
    if (role === "admin")
        return done(null, payload);
    return done("you dont have permission to do this", false);
}));
passport_1.default.use(new passport_jwt_1.Strategy({
    secretOrKey: process.env.JWT_SECRET_KEY,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
}, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, firstName, lastName, role } = payload;
    const userRepo = database_1.AppDataSource.getRepository(user_entity_1.User);
    const user = yield userRepo.findOneBy({ id: user_id });
    if (!user_id ||
        !firstName ||
        !lastName ||
        !role ||
        !user ||
        user.id != user_id ||
        user.role != role) {
        return done("token is not valid!", false);
    }
    return done(null, {
        user_id,
        firstName,
        lastName,
        role,
    });
})));
const verifyToken = () => {
    return passport_1.default.authenticate("jwt", { session: false });
};
exports.verifyToken = verifyToken;
const require_admin = () => {
    return passport_1.default.authorize("authz", { failWithError: false });
};
exports.require_admin = require_admin;
