"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkImageExtension = exports.checkEmail = exports.checkPhoneNumber = void 0;
const checkPhoneNumber = (number) => {
    return /^0[0-9]{9}$/g.test(number);
};
exports.checkPhoneNumber = checkPhoneNumber;
const checkEmail = (email) => {
    return /^(([\w]+)(\.*))+@((\w+)(\.)){1,}(com|net|co|vn|edu|gov|biz|org|uk)$/g.test(email);
};
exports.checkEmail = checkEmail;
const checkImageExtension = (name) => {
    const regex = /^((([a-zA-Z0-9]+)(\s*))+(\_*)*(\-*))+(.jpg|.png|.jpeg)$/gmi;
    return regex.test(name);
};
exports.checkImageExtension = checkImageExtension;
