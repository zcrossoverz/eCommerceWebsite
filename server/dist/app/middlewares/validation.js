"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateImageExtension = exports.validatePhoneNumber = exports.validateEmail = void 0;
const validation_1 = require("../utils/validation");
const error_1 = require("../utils/error");
const validation_2 = require("../utils/validation");
const error_2 = __importDefault(require("./error"));
const validateEmail = (req, res, next) => {
    const { email } = req.body;
    if (!email)
        return next();
    const test = (0, validation_1.checkEmail)(email);
    return test ? next() : next((0, error_2.default)((0, error_1.BadRequestError)("email is not valid!"), res));
};
exports.validateEmail = validateEmail;
const validatePhoneNumber = (req, res, next) => {
    const { phone } = req.body;
    if (!phone)
        return next();
    const test = (0, validation_1.checkPhoneNumber)(phone);
    return test ? next() : next((0, error_2.default)((0, error_1.BadRequestError)("phone number is not valid!"), res));
};
exports.validatePhoneNumber = validatePhoneNumber;
const validateImageExtension = (req, res, next) => {
    if (!req.file && !req.files)
        return next((0, error_2.default)((0, error_1.BadRequestError)("image not found!"), res));
    if (req.file) {
        const { filename } = req.file;
        return (0, validation_2.checkImageExtension)(filename) ? next() : next((0, error_2.default)((0, error_1.BadRequestError)("file extension is not valid"), res));
    }
    return next();
};
exports.validateImageExtension = validateImageExtension;
