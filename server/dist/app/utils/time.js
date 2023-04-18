"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSeconds = exports.getMinutes = exports.getHours = exports.getYear = exports.getMonth = exports.getDay = void 0;
const now = new Date();
now.toLocaleString('vn-VI', { timeZone: 'Asia/Ho_Chi_Minh' });
const getDay = () => {
    return now.getDate();
};
exports.getDay = getDay;
const getMonth = () => {
    return now.getMonth() + 1;
};
exports.getMonth = getMonth;
const getYear = () => {
    return now.getFullYear();
};
exports.getYear = getYear;
const getHours = () => {
    return now.getHours();
};
exports.getHours = getHours;
const getMinutes = () => {
    return now.getMinutes();
};
exports.getMinutes = getMinutes;
const getSeconds = () => {
    return now.getSeconds();
};
exports.getSeconds = getSeconds;
