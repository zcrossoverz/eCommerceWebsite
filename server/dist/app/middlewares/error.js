"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const err = (err, res) => {
    res.status(err.statusCode).json({ error: err.error });
    return;
};
exports.default = err;
