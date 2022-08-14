"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./config/logger"));
const server_1 = __importDefault(require("./config/server"));
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const startServer = () => {
    mongoose_1.default.connect(config_1.default.dbUrl).then(() => {
        logger_1.default.info('Connected to MongoDB');
        server_1.default.listen(config_1.default.port, () => {
            logger_1.default.info(`Server running in ${config_1.default.env} and listening on port ${config_1.default.port}`);
        });
    });
};
startServer();
// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    logger_1.default.error(`Error: ${err}`);
    // Close server and exit process
    server_1.default.close(() => process.exit(1));
});
const exitHandler = () => {
    if (server_1.default) {
        server_1.default.close(() => {
            logger_1.default.info('Server closed');
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
const unexpectedErrorHandler = (error) => {
    logger_1.default.error(error);
    exitHandler();
};
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', () => {
    logger_1.default.info('SIGTERM received');
    if (server_1.default) {
        server_1.default.close();
    }
});
exports.default = server_1.default;
