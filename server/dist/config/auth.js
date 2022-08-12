"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_openid_connect_1 = require("express-openid-connect");
const index_1 = __importDefault(require("./index"));
const { baseURL, clientID, issuerBaseURL, secret } = index_1.default.auth;
const AuthConfig = {
    authRequired: false,
    auth0Logout: true,
    secret,
    baseURL,
    clientID,
    issuerBaseURL,
};
exports.default = (0, express_openid_connect_1.auth)(AuthConfig);
