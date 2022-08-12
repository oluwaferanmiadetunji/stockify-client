"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./error");
const rateLimiter_1 = __importDefault(require("./rateLimiter"));
exports.default = {
    errorConverter: error_1.errorConverter,
    rateLimiter: rateLimiter_1.default,
    ErrorHandler: error_1.ErrorHandler,
};
