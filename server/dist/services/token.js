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
exports.generateAuthenticationToken = exports.verifyToken = exports.saveToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("../utils/helpers");
const moment_1 = __importDefault(require("moment"));
const config_1 = __importDefault(require("../config"));
const models_1 = require("../models");
const generateToken = ({ expires, user, }) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign({
        sub: user,
        iat: (0, moment_1.default)().unix(),
        //   expires: moment().add(120, 'minutes'),
        expires,
    }, config_1.default.jwtSecret);
});
exports.generateToken = generateToken;
const saveToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenDoc = yield models_1.Token.create(Object.assign(Object.assign({}, payload), { _id: (0, helpers_1.generateRandomString)() }));
    return tokenDoc;
});
exports.saveToken = saveToken;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
    const tokenDoc = yield models_1.Token.findOne({ token, user: payload.sub });
    if (!tokenDoc) {
        throw new Error('Token not found');
    }
    return tokenDoc;
});
exports.verifyToken = verifyToken;
const generateAuthenticationToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const expires = (0, moment_1.default)().add(120, 'minutes').toISOString();
    const token = yield (0, exports.generateToken)({ user, expires });
    yield (0, exports.saveToken)({ expires, token, user });
    return token;
});
exports.generateAuthenticationToken = generateAuthenticationToken;
