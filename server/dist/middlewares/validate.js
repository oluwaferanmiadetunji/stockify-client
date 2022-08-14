"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const http_status_1 = __importDefault(require("http-status"));
const helpers_1 = require("../utils/helpers");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const validate = (schema) => (req, res, next) => {
    const validSchema = (0, helpers_1.pickQueryParams)(schema, ['params', 'query', 'body']);
    const object = (0, helpers_1.pickQueryParams)(req, Object.keys(validSchema));
    const { value, error } = joi_1.default.compile(validSchema)
        .prefs({ errors: { label: 'key' } })
        .validate(object);
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return next(new ApiError_1.default(http_status_1.default.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
};
exports.default = validate;
