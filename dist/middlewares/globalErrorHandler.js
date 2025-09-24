"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.log("Error middleware: ", err.message);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "something went wrong"
    });
};
exports.errorHandler = errorHandler;
