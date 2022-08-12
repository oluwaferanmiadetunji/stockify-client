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
    port: parseInt(process.env.PORT || '', 10),
    suffix: process.env.SUFFIX || 'development',
    firebaseServiceAccount: {
        type: 'service_account',
        projectId: process.env.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID || '',
        private_key_id: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID || '',
        privateKey: (process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL || '',
        client_id: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_ID || '',
        auth_uri: process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_URI || '',
        token_uri: process.env.FIREBASE_SERVICE_ACCOUNT_TOKEN_URI || '',
        auth_provider_x509_cert_url: process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER || '',
        client_x509_cert_url: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_CERT_URL || '',
    },
    apiURL: process.env.WEALTH8_API_URL || '',
    zendesk: {
        baseURL: process.env.ZD_BASE_URL || '',
        username: process.env.ZD_USERNAME || '',
        token: process.env.ZD_TOKEN || '',
    },
    auth: {
        secret: process.env.AUTH_SECRET || '',
        issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL || '',
        clientID: process.env.AUTH_CLIENT_ID || '',
        baseURL: process.env.AUTH_BASE_URL || '',
        audience: process.env.AUTH_AUDIENCE || '',
    },
    downloadCount: process.env.DOWNLOADS || '500',
};
