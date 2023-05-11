"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.testLogin = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../utils/error");
const userServices = __importStar(require("../services/user.service"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const error_2 = __importDefault(require("../middlewares/error"));
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (email && password) {
        const user = yield userServices.findOneByEmail(email);
        if ((0, error_1.isError)(user)) {
            return next((0, error_2.default)((0, error_1.BadRequestError)("user not found!"), res));
        }
        if (bcryptjs_1.default.compareSync(password, user.password))
            return res.json({
                message: "login success",
                token: jsonwebtoken_1.default.sign({
                    user_id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                }, process.env.JWT_SECRET_KEY || "nhan")
            });
        else
            return next((0, error_2.default)((0, error_1.BadRequestError)("password is incorrect!"), res));
    }
    return next((0, error_2.default)((0, error_1.BadRequestError)("email or password cannot be empty!"), res));
});
exports.login = login;
const testLogin = (req, res) => {
    return res.json({ "login success": "ok" });
};
exports.testLogin = testLogin;
