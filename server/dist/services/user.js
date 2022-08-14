"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.createUser = void 0;
const http_status_1 = __importDefault(require("http-status"));
const models_1 = require("../models");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const helpers_1 = require("../utils/helpers");
const createUser = (userBody) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    if (yield models_1.User.isEmailTaken(userBody.email)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Email already taken');
    }
    const user = yield models_1.User.create(Object.assign(Object.assign({}, userBody), { _id: (0, helpers_1.generateRandomString)() }));
    return user;
});
exports.createUser = createUser;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.User.findOne({ email });
});
exports.getUserByEmail = getUserByEmail;
