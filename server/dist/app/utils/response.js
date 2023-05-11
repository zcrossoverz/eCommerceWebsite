"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failed = exports.success = void 0;
const success = () => {
    return { message: "success" };
};
exports.success = success;
const failed = () => {
    return { message: "failed" };
};
exports.failed = failed;
