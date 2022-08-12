"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const index_1 = __importDefault(require("./index"));
(0, app_1.initializeApp)({
    credential: (0, app_1.cert)(index_1.default.firebaseServiceAccount),
});
exports.db = (0, firestore_1.getFirestore)();
