"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env') });
const required = ['PORT', 'DB_HOST', 'DB_USER', 'DB_PASSWORD', 'GOVERNMENT_API_URL'];
required.forEach((key) => {
    if (!process.env[key])
        throw new Error(`Missing env variable: ${key}`);
});
exports.config = {
    port: process.env.PORT || 3000,
    corsOrigins: process.env.CORS_ORIGINS?.split(';') || [],
    db: {
        host: process.env.DB_HOST || '',
        user: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        name: process.env.DB_NAME || '',
    },
    governmentApiUrl: process.env.GOVERNMENT_API_URL || '',
};
