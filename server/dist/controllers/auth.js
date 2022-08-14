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
exports.login = exports.createNewUser = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const services_1 = require("../services");
exports.createNewUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield services_1.userService.createUser({ email, password });
        res.status(http_status_1.default.CREATED).send(user);
    }
    catch (error) {
        console.log('Error: ', JSON.stringify(error));
        res.status(http_status_1.default.CONFLICT).json({ message: 'Error creating user' });
    }
}));
exports.login = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield services_1.userService.getUserByEmail(email);
    //@ts-ignore
    if (!user || !(yield user.isPasswordMatch(password))) {
        return res
            .status(http_status_1.default.UNAUTHORIZED)
            .json({ message: 'Incorrect email or password' });
    }
    const token = yield services_1.tokenService.generateAuthenticationToken(user._id);
    res.status(http_status_1.default.OK).json({ message: 'Login successful', token, user });
}));
