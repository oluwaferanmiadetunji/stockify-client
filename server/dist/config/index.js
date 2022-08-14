"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
exports.default = {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '8000', 10),
    dbUrl: process.env.URI || '',
    jwtSecret: process.env.JWT_SECRET || '',
};
