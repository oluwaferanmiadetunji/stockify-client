"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const transports = [];
const { combine, timestamp, json } = winston_1.default.format;
const options = {
    level: 'silly',
    filename: `src/logs/app.log`,
    handleExceptions: false,
    json: true,
    maxsize: 5242880,
    colorize: false,
};
transports.push(new winston_1.default.transports.Console(), new winston_1.default.transports.File(options));
const LoggerInstance = winston_1.default.createLogger({
    level: 'debug',
    levels: winston_1.default.config.npm.levels,
    format: combine(timestamp(), json()),
    transports,
});
exports.default = LoggerInstance;
