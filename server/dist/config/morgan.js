"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.successHandler = void 0;
const morgan_1 = __importDefault(require("morgan"));
const _1 = __importDefault(require("."));
const logger_1 = __importDefault(require("./logger"));
morgan_1.default.token('message', (req, res) => res.locals.errorMessage || '');
const getIpFormat = () => (_1.default.env === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;
exports.successHandler = (0, morgan_1.default)(successResponseFormat, {
    skip: (req, res) => res.statusCode >= 400,
    stream: { write: (message) => logger_1.default.info(message.trim()) },
});
exports.errorHandler = (0, morgan_1.default)(errorResponseFormat, {
    skip: (req, res) => res.statusCode < 400,
    stream: { write: (message) => logger_1.default.error(message.trim()) },
});
