"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = require("express");
const product_router_1 = __importDefault(require("./routes/product.router"));
exports.appRouter = (0, express_1.Router)();
exports.appRouter.use('/api/v1/products', product_router_1.default);
exports.appRouter.get('/api/v1/status', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
    });
});
