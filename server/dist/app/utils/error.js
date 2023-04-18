"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isError = exports.BadRequestError = void 0;
const BadRequestError = (message, statusCode = 500) => {
    return ({ statusCode, error: message });
};
exports.BadRequestError = BadRequestError;
const isError = (obj) => {
    return Object.keys(obj).includes("error");
};
exports.isError = isError;
